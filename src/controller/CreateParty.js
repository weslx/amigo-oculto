import generateCode from "../models/generateinvitecode.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CreateParty {
  async create(req, res) {
    const { email, NomeGrupo, quantidadePessoa } = req.body;
    const Tag = generateCode();

    const user = await prisma.User.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Usuario nao encontrado" });
    }

    try {
      const CriarGrupo = await prisma.Party.create({
        data: {
          NomeGrupo: NomeGrupo,
          Tag: Tag,
          quantidadePessoa: quantidadePessoa,
          ownerId: user.id,
        },
      });

      await prisma.UserParty.create({
        data: {
          userId: user.id,
          partyId: CriarGrupo.id,
        },
      });
      return res.status(200).json({ message: "Usuario Criado" });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default new CreateParty();
