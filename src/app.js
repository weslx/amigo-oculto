import express from "express";
import routes from "./routes/router.js";
import cors from "cors";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      this.app.use(cors());
      next();
    });
  }
  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
