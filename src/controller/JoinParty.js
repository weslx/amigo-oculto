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

    // If the party doesn't exist, return an error
    if (!GrupoExistente) {
      return res.status(400).json({ error: "Grupo nao existe" });
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
        .json("Ocorreu um erro, talvez voce ja esta nesse grupo...");
    }
  }
}

export default new JoinParty();
