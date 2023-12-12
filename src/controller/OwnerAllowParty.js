import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AllowParty {
  async set(requisicao, resposta) {
    const { emailUsuario, emailOutroUsuario, tagFesta } = requisicao.body;

    // Encontre o usuário (dono da festa)
    const donoFesta = await prisma.user.findUnique({
      where: { email: emailUsuario },
    });

    if (!donoFesta) {
      return resposta
        .status(404)
        .json({ error: "Dono da festa não encontrado" });
    }

    // Encontre a festa
    const festa = await prisma.party.findUnique({
      where: { Tag: tagFesta },
    });

    if (!festa) {
      return resposta.status(404).json({ error: "Festa não encontrada" });
    }

    // Verifique se o usuário é o dono da festa
    if (festa.ownerId !== donoFesta.id) {
      return resposta
        .status(403)
        .json({ error: "Usuário não é o dono da festa" });
    }

    // Encontre o outro usuário
    const outroUsuario = await prisma.user.findUnique({
      where: { email: emailOutroUsuario },
    });

    if (!outroUsuario) {
      return resposta
        .status(404)
        .json({ error: "Outro usuário não encontrado" });
    }

    // Atualize o status do UserParty
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

    return resposta.json(statusAtualizadoUserParty);
  }
}

export default new AllowParty();
