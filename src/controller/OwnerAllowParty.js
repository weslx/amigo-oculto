import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AllowParty {
  async set(req, res) {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log(user);
    const ownedparty = await prisma.party.findFirst({
      where: {
        ownerId: user.id,
      },
    });
    console.log(ownedparty);
  }
}

export default new AllowParty();
