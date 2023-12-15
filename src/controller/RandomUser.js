import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class RandomUser {
  async random(req, res) {
    const { email, tag } = req.body;

    const party = await prisma.party.findFirst({
      where: {
        Tag: tag,
        owner: {
          email: email,
        },
      },
      include: {
        users: {
          where: {
            status: "ACCEPTED",
          },
          include: {
            user: true,
          },
        },
      },
    });

    if (!party) {
      return res
        .status(404)
        .json({ error: "Grupo nao encontrado, ou voce nao e o dono" });
    }

    const users = party.users.map((userParty) => userParty.user);

    for (let i = users.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [users[i], users[j]] = [users[j], users[i]];
    }

    let secretFriends = [];

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const secretFriend = users[(i + 1) % users.length];

      await prisma.userParty.update({
        where: {
          userId_partyId: {
            userId: user.id,
            partyId: party.id,
          },
        },
        data: {
          secretFriendId: secretFriend.id,
        },
      });

      secretFriends.push(
        `${user.nome} agora é um amigo de ${secretFriend.nome}`
      );
    }

    return res.status(200).json({
      message: "Amigos secretos atribuídos",
      secretFriends: secretFriends,
    });
  }
}

export default new RandomUser();
