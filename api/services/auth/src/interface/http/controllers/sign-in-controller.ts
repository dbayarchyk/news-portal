import { Request, Response } from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
} from "inversify-express-utils";

import { IOCTypes } from "../../../infrastructure/ioc/types";
import { SignInUseCase } from "../../../application/use-cases/sign-in-use-case";
import { AuthCookiesService } from '../services/auth-cookies-service';

@controller("/sign-in")
export class SignInController extends BaseHttpController {
  public constructor(
    @inject(IOCTypes.SignInUseCase)
    private readonly signInUseCase: SignInUseCase
  ) {
    super();
  }

  @httpPost("/")
  public async createComment(req: Request, res: Response): Promise<void> {
    const errorsOrAuthCredentials = await this.signInUseCase.execute(
      req.body
    );

    if (errorsOrAuthCredentials.isLeft()) {
      const error = errorsOrAuthCredentials.value;
      res.status(error.statusCode);
      res.send(error.serialize());
      return;
    }

    const authCredentials = errorsOrAuthCredentials.value;

    AuthCookiesService.setAuthCookies(authCredentials, res.cookie.bind(res));
    res.send({
      ok: true
    });
  }
}
