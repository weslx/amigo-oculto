import { Router } from "express";
import CreateUser from "../controller/CreateUser.js";
import CreateParty from "../controller/CreateParty.js";

const routes = new Router();

routes.post("/criaruser", CreateUser.save);

routes.post("/criarparty", CreateParty.create);

routes.get("/", (req, res) => {
  res.send("Teste");
});

export default routes;
