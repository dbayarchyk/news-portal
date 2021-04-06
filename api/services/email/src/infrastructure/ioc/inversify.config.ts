import { Container } from "inversify";

import { IOCTypes } from "./types";
import { ReactEmailCreatorService } from "../emails/react-email-creator-service";
import { NodemailerEmailClientService } from "../emails/nodemailer-email-client-service";
import { SendEmailUseCase } from "../../application/use-cases/send-email";
import { EmailCreatorService } from "../../application/services/email-creator-service";
import { EmailClientService } from "../../application/services/email-client-service";

export const iocContainer = new Container();

iocContainer
  .bind<EmailCreatorService>(IOCTypes.EmailCreatorService)
  .to(ReactEmailCreatorService);

iocContainer
  .bind<SendEmailUseCase>(IOCTypes.SendEmailUseCase)
  .to(SendEmailUseCase);

iocContainer
  .bind<EmailClientService>(IOCTypes.EmailClientService)
  .to(NodemailerEmailClientService);
