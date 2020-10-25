import { Request, Response } from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
} from "inversify-express-utils";

import TYPES from "../../ioc/types";
import { UserServiceLocator } from "../../service-locators/user-service-locator";

@controller("/sign-up")
export class SignUpController extends BaseHttpController {
  public constructor(
    @inject(TYPES.UserServiceLocator)
    private readonly userService: UserServiceLocator
  ) {
    super();
  }

  @httpPost("/")
  public async createComment(req: Request, res: Response): Promise<void> {
    const errorsOrUser = await this.userService.signUpUseCase.execute(req.body);

    if (errorsOrUser.isLeft()) {
      const errors = errorsOrUser.value;
      res.send(errors);
      return;
    }

    const user = errorsOrUser.value;

    res.send(user);
  }
}
