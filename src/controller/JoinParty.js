import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class JoinParty {
  async join(req, res) {
    const { email, tag } = req.body;

    const user = await prisma.User.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Usuario nao encontrado" });
    }

    const GrupoExistente = await prisma.Party.findUnique({
      where: {
        Tag: tag,
      },
    });

    if (!GrupoExistente) {
      return res.status(400).json({ error: "Grupo nao existe" });
    }

    const userEstaNoGrupo = await prisma.UserParty.findUnique({
      where: {
        userId_partyId: {
          userId: user.id,
          partyId: GrupoExistente.id,
        },
      },
    });

    if (userEstaNoGrupo) {
      console.log(userEstaNoGrupo);
      return res
        .status(400)
        .json({
          error:
            "Voce ja esta nesse grupo, com o seguinte status: " +
            userEstaNoGrupo.status,
        });
    }

    try {
      const EntrarGrupo = await prisma.UserParty.create({
        data: {
          userId: user.id,
          partyId: GrupoExistente.id,
        },
      });
      return res.status(200).json(EntrarGrupo);
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Ocorreu um erro ao entrar no grupo" });
    }
  }
}

export default new JoinParty();
