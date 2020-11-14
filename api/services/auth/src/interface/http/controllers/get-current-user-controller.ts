import { Request, Response } from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
} from "inversify-express-utils";

import { IOCTypes } from "../../../infrastructure/ioc/types";
import { GetCurrentUserUseCase } from "../../../application/use-cases/get-current-user-use-case";

@controller("/me")
export class GetCurrentUserController extends BaseHttpController {
  public constructor(
    @inject(IOCTypes.GetCurrentUserUseCase)
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase
  ) {
    super();
  }

  @httpGet("/")
  public async getCurrentUser(req: Request, res: Response): Promise<void> {
    const errorOrCurrentUser = await this.getCurrentUserUseCase.execute({ accessToken: req.cookies['access-token'] });

    if (errorOrCurrentUser.isLeft()) {
      const error = errorOrCurrentUser.value;
      res.status(error.statusCode);
      res.send(error.serialize());
      return;
    }

    const currentUser = errorOrCurrentUser.value;

    res.send(currentUser);
  }
}
