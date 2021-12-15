import HttpStatus from "http-status-codes";
import countapi, { Result } from "countapi-js";
import { Request, Response } from "express";

class AccessController {
  public static async getTotalAccess(
    req: Request,
    res: Response
  ): Promise<Response> {
    const site = "www.ton.com.br";
    const key = process.env.KEY_COUNT_API || "h4aobV2icj";
    const result: Result = await countapi.get(site, key);
    return res.json({ accessNumber: result.value || 0 }).send();
  }

  public static async addAccess(
    req: Request,
    res: Response
  ): Promise<Response> {
    const site = "www.ton.com.br";
    const key = process.env.KEY_COUNT_API || "h4aobV2icj";
    await countapi.hit(site, key);
    return res.status(HttpStatus.OK).send();
  }
}

export default AccessController;
