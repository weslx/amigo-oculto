import { Router } from "express";

const routes = new Router();

routes.get("/", (req, res) => {
  res.send("Teste");
});

export default routes;
