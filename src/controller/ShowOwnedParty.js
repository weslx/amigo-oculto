import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ShowParties {
  async get(req, res) {
    const { email } = req.body;
    console.log(email);
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        email: true,
        parties: {
          select: {
            userId: true,
            partyId: true,
            secretFriendId: true,
            status: true,
            party: true,
            secretFriend: {
              select: {
                id: true,
                nome: true,
                sobrenome: true,
                email: true,
                parties: true,
                ownedParties: true,
                secretFriends: true,
              },
            },
          },
        },
        ownedParties: true,
      },
    });

    const ownedparty = await prisma.party.findMany({
      where: {
        ownerId: user.id,
      },
      include: {
        users: {
          include: {
            user: {
              select: {
                id: true,
                nome: true,
                sobrenome: true,
                email: true,
                parties: true,
                ownedParties: true,
                secretFriends: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json(ownedparty);
  }
}

export default new ShowParties();
