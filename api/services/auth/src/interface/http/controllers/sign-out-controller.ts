import { Request, Response } from "express";
import {
  BaseHttpController,
  controller,
  httpPost,
} from "inversify-express-utils";

import { AuthCookiesService } from '../services/auth-cookies-service';

@controller("/sign-out")
export class SignOutController extends BaseHttpController {
  @httpPost("/")
  public async createComment(_req: Request, res: Response): Promise<void> {
    AuthCookiesService.removeAuthCookies(res.cookie.bind(res));
    res.send({
      ok: true
    });
  }
}
