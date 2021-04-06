import { injectable, inject } from "inversify";

import { EmailClientService } from "../services/email-client-service";
import { EmailCreatorService } from "../services/email-creator-service";
import { UseCase } from "../../shared/application/use-case";
import { Either, right, left } from "../../shared/logic/either";
import { FieldsValidationError } from "../../shared/errors/fields-validation-error";
import { IOCTypes } from "../../infrastructure/ioc/types";

export interface SendEmailUseCaseRequest {
  emailType: string;
  recipientEmails: string[];
  emailData: Record<string, unknown>;
}

export type SendEmailUseCaseResponse = Either<FieldsValidationError, void>;

@injectable()
export class SendEmailUseCase implements UseCase<SendEmailUseCaseRequest, SendEmailUseCaseResponse> {
  public constructor(
    @inject(IOCTypes.EmailClientService)
    private readonly emailClientService: EmailClientService,
    @inject(IOCTypes.EmailCreatorService)
    private readonly emailCreatorService: EmailCreatorService,
  ) {}

  public async execute(request: SendEmailUseCaseRequest): Promise<SendEmailUseCaseResponse> {
    const errorOrEmail = this.emailCreatorService
      .createEmail(
        request.emailType,
        request.emailData,
      );

    if (errorOrEmail.isLeft()) {
      const error = errorOrEmail.value;
      return left(error as any);
    }

    const email = errorOrEmail.value;

    this.emailClientService.sendEmail({
      recipientEmails: request.recipientEmails,
      subject: email.content,
      content: email.content,
    });

    return right(undefined);
  }
}
