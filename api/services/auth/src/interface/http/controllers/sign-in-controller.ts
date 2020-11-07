import { Request, Response } from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
} from "inversify-express-utils";

import { IOCTypes } from "../../../infrastructure/ioc/types";
import { SignInUseCase } from "../../../application/use-cases/sign-in-use-case";

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
      const errors = errorsOrAuthCredentials.value;
      res.send(errors.serialize());
      return;
    }

    const authCredentials = errorsOrAuthCredentials.value;

    res.send(authCredentials);
  }
}
