import { Request, Response } from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
} from "inversify-express-utils";

import { IOCTypes } from "../../../infrastructure/ioc/types";
import { SignUpUseCase } from "../../../application/use-cases/sign-up-use-case";

@controller("/sign-up")
export class SignUpController extends BaseHttpController {
  public constructor(
    @inject(IOCTypes.SignUpUseCase)
    private readonly signUpUseCase: SignUpUseCase
  ) {
    super();
  }

  @httpPost("/")
  public async createComment(req: Request, res: Response): Promise<void> {
    const errorsOrUser = await this.signUpUseCase.execute(req.body);

    if (errorsOrUser.isLeft()) {
      const errors = errorsOrUser.value;
      res.send(errors.serialize());
      return;
    }

    const user = errorsOrUser.value;

    res.send(user);
  }
}
