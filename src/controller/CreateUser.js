import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CreateUser {
  async save(req, res) {
    const { nome, sobrenome, email, senha } = req.body;
    console.log(email);
    if (email === "") {
      return res.status(400).json("Email invalido");
    }
    const usuarioExiste = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (usuarioExiste) {
      return res.status(400).json("Usuario ja existe");
    }

    try {
      const usuarioCriado = await prisma.User.create({
        data: {
          nome: nome,
          sobrenome: sobrenome,
          email: email,
          senha: senha,
        },
      });
      await prisma.$disconnect();
      return res.status(200).json("sucesso");
    } catch (error) {
      await prisma.$disconnect();
      return res.status(400).json(error);
    }
  }
}

export default new CreateUser();
