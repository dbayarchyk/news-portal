import { Request, Response } from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
} from "inversify-express-utils";

import { IOCTypes } from "../../../infrastructure/ioc/types";
import { SendEmailUseCase, SendEmailUseCaseRequest } from "../../../application/use-cases/send-email";

@controller("/send-email")
export class SendEmailController extends BaseHttpController {
  public constructor(
    @inject(IOCTypes.SendEmailUseCase)
    private readonly sendEmailUseCase: SendEmailUseCase
  ) {
    super();
  }

  @httpPost("/")
  public async sendEmail(req: Request<SendEmailUseCaseRequest>, res: Response): Promise<void> {
    const errorOrResult = await this.sendEmailUseCase.execute({
      recipientEmails: req.body.recipientEmails,
      emailType: req.body.emailType,
      emailData: req.body.emailData,
    });

    if (errorOrResult.isLeft()) {
      const error = errorOrResult.value;
      res.status(error.statusCode);
      res.send(error.serialize());
      return;
    }

    const result = errorOrResult.value;

    res.send(result);
  }
}
