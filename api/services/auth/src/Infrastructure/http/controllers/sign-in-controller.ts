import { Request, Response } from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
} from "inversify-express-utils";

import TYPES from "../../ioc/types";
import { UserServiceLocator } from "../../service-locators/user-service-locator";

@controller("/sign-in")
export class SignInController extends BaseHttpController {
  public constructor(
    @inject(TYPES.UserServiceLocator)
    private readonly userService: UserServiceLocator
  ) {
    super();
  }

  @httpPost("/")
  public async createComment(req: Request, res: Response): Promise<void> {
    const errorsOrAuthCredentials = await this.userService.signInUseCase.execute(
      req.body
    );

    if (errorsOrAuthCredentials.isLeft()) {
      const errors = errorsOrAuthCredentials.value;
      res.send(errors);
      return;
    }

    const authCredentials = errorsOrAuthCredentials.value;

    res.send(authCredentials);
  }
}
