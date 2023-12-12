import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ShowFriends {
  async get(req, res) {
    const { email } = req.body;
  }
}
