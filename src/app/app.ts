import express from "express";
import cors from "cors";
import errorhandler from "errorhandler";
import swaggerUI from "swagger-ui-express";

import routes from "./routes";
import swaggerDocument from "./swagger.json";

class App {
  public express: express.Application;

  private environment: string;

  public constructor() {
    this.environment = process.env.NODE_ENV || "development";

    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use(routes);
    this.express.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

    if (this.environment === "development") {
      this.express.use(errorhandler());
    }
  }
}

export default new App().express;
