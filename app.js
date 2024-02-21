import express from "express";
import { config } from "dotenv";
import cors from "cors";
import router from "./routes/query.router.js";

config();

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.path = "API";

    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(`/${this.path}`, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App running in port ${this.port}`);
    });
  }
}
