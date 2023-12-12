import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ShowParties {
  async get(req, res) {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    const ownedparty = await prisma.party.findMany({
      where: {
        ownerId: user.id,
      },
    });

    return res.status(200).json(ownedparty);
  }
}

export default new ShowParties();
