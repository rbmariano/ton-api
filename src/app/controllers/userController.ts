import { Request, Response } from "express";
import HttpStatus from "http-status-codes";

import UserRepository from "../libs/userRepository";
import User from "../model/user";

class UserController {
  public static async read(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await UserRepository.getById(parseInt(id));
    if (user) return res.json(user).send();
    return res.status(HttpStatus.NOT_FOUND).send();
  }

  public static async create(req: Request, res: Response): Promise<Response> {
    const data: User = req.body;
    const user: User = await UserRepository.save(data);
    return res.json(user).send();
  }
}

export default UserController;
