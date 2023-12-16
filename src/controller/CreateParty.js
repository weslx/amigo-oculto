import generateCode from "../utils/generateinvitecode.js";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import verificaTamanhoDaImagem from "../utils/ConverterByteParaMb.js";

const prisma = new PrismaClient();
class CreateParty {
  async create(req, res) {
    const { email, NomeGrupo, quantidadePessoa } = req.body;
    const quantidadeInt = parseInt(quantidadePessoa);
    const image = req.file;
    const Tag = generateCode();
    console.log(email);
    console.log(NomeGrupo);
    const user = await prisma.User.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Usuario nao encontrado" });
    }

    const ImagemEmMb = image.size / (1024 * 1024);
    if (ImagemEmMb > 5) {
      fs.unlinkSync(image.path);
      return res.status(400).json({ error: "A imagem deve ser menor que 5mb" });
    }
    const form = new FormData();
    form.append("file", fs.createReadStream(image.path));

    let LinkImagem;
    try {
      const response = await axios.post("https://telegra.ph/upload", form, {
        headers: form.getHeaders(),
      });
      fs.unlinkSync(image.path);
      LinkImagem = "https://telegra.ph" + response.data[0].src;
    } catch (error) {
      fs.unlinkSync(image.path);
      return res
        .status(400)
        .json({ error: "Ocorreu um erro ao fazer o upload da imagem" });
    }

    console.log(LinkImagem);

    try {
      const CriarGrupo = await prisma.Party.create({
        data: {
          NomeGrupo: NomeGrupo,
          Tag: Tag,
          quantidadePessoa: quantidadeInt,
          ownerId: user.id,
          ImagemGrupo: LinkImagem,
        },
      });

      await prisma.UserParty.create({
        data: {
          userId: user.id,
          partyId: CriarGrupo.id,
          status: "ACCEPTED",
        },
      });
      return res
        .status(200)
        .json({ message: "Grupo criado com a seguinte tag: " + Tag });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default new CreateParty();
