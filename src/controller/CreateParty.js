import bcrypt from "bcryptjs";
import generateCode from "../models/generateinvitecode.js";

class CreateParty {
  async create(req, res) {
    const { email, NomeGrupo } = req.body;
    const Code = generateCode();
  }
}

export default new CreateParty();
