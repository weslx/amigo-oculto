import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ShowFriends {
  async get(req, res) {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        parties: {
          include: {
            party: true,
            secretFriend: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const responseData = user.parties.map((userParty) => ({
      partyName: userParty.party.NomeGrupo,
      partyTag: userParty.party.Tag,
      status: userParty.status,
      secretFriend: userParty.secretFriend
        ? `${userParty.secretFriend.nome} ${userParty.secretFriend.sobrenome}`
        : null,
    }));

    return res.status(200).json(responseData);
  }
}

export default new ShowFriends();
