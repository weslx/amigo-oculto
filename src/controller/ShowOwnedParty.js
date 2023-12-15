import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ShowParties {
  async get(req, res) {
    try {
      const { email } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          nome: true,
          sobrenome: true,
          email: true,
          parties: true,
          ownedParties: true,
        },
      });

      const ownedparty = await prisma.party.findMany({
        where: {
          ownerId: user.id,
        },
        include: {
          users: true,
        },
      });

      // Mude esse objeto caso queira uma estrutura diferente
      const result = {
        id: user.id,
        nome: user.nome,
        sobrenome: user.sobrenome,
        email: user.email,
        parties: user.parties,
        ownedParties: ownedparty,
      };

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ocorreu um erro." });
    }
  }
}

export default new ShowParties();
