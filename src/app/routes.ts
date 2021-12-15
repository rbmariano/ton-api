import { Router } from "express";

import AccessController from "./controllers/accessController";
import UserController from "./controllers/userController";

class Routes {
  public routes: Router;

  constructor() {
    this.routes = Router();
    this.Routes();
  }

  private Routes(): void {
    this.routes.get("/access", AccessController.getTotalAccess);
    this.routes.post("/access", AccessController.addAccess);

    this.routes.get("/user/:id", UserController.read);
    this.routes.post("/user", UserController.create);
  }
}

export default new Routes().routes;
