import { Request, Response } from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
} from "inversify-express-utils";

import { IOCTypes } from "../../../infrastructure/ioc/types";
import { RefreshTokensUseCase } from "../../../application/use-cases/refresh-tokens-use-case";
import { AuthCookiesService } from '../services/auth-cookies-service';

@controller("/refresh")
export class RefreshTokensController extends BaseHttpController {
  public constructor(
    @inject(IOCTypes.RefreshTokensUseCase)
    private readonly refreshTokensUseCase: RefreshTokensUseCase
  ) {
    super();
  }

  @httpPost("/")
  public async refreshTokens(req: Request, res: Response): Promise<void> {
    const errorOrAuthCredentials= await this.refreshTokensUseCase.execute({ refreshToken: req.cookies['refresh-token'] });

    if (errorOrAuthCredentials.isLeft()) {
      const error = errorOrAuthCredentials.value;
      res.send(error.serialize ? error.serialize() : error.message);
      return;
    }

    const authCredentials = errorOrAuthCredentials.value;

    AuthCookiesService.setAuthCookies(authCredentials, res.cookie.bind(res));
    res.send({
      ok: true
    });
  }
}
