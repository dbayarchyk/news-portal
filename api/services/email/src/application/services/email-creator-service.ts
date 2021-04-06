import { Either } from "../../shared/logic/either";
import { ValidationError } from "../../shared/errors/validation-error";

export interface Email {
  subject: string;
  content: string;
}

export interface EmailCreatorService {
  createEmail(
    emailType: string,
    emailData: Record<string, unknown>,
  ): Either<ValidationError, Email>;
}
