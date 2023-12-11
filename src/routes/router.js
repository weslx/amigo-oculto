import { Router } from "express";
import CreateUser from "../controller/CreateUser.js";
import CreateParty from "../controller/CreateParty.js";
import JoinParty from "../controller/JoinParty.js";

const routes = new Router();

routes.post("/criaruser", CreateUser.save);

routes.post("/entrargrupo", JoinParty.join);

routes.post("/criarparty", CreateParty.create);

routes.get("/", (req, res) => {
  res.send("Teste");
});

export default routes;
