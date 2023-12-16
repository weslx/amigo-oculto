import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AllowParty {
  async set(req, res) {
    const { emailDono, emailOutroUsuario, tagFesta } = req.body; // apenas essa api tem a variavel diferente, nas outras o email = email do usuario

    const donoFesta = await prisma.user.findUnique({
      where: { email: emailDono },
    });

    if (!donoFesta) {
      return res.status(404).json({ error: "Dono da festa não encontrado" });
    }

    const festa = await prisma.party.findUnique({
      where: { Tag: tagFesta },
    });

    if (!festa) {
      return res.status(404).json({ error: "Festa não encontrada" });
    }

    if (festa.ownerId !== donoFesta.id) {
      return res.status(403).json({ error: "Usuário não é o dono da festa" });
    }

    const outroUsuario = await prisma.user.findUnique({
      where: { email: emailOutroUsuario },
    });

    if (!outroUsuario) {
      return res.status(404).json({ error: "Outro usuário não encontrado" });
    }

    const statusAtualizadoUserParty = await prisma.userParty.updateMany({
      where: {
        userId: outroUsuario.id,
        partyId: festa.id,
        status: "PENDING",
      },
      data: {
        status: "ACCEPTED",
      },
    });
    if (statusAtualizadoUserParty.count === 0) {
      return res.status(400).json("Este usuario ja esta aceito no grupo");
    } else {
      return res.status(200).json("Usuario aceito com sucesso");
    }
  }
}

export default new AllowParty();
