import { injectable } from "inversify";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";

import { EmailCreatorService, Email } from "../../application/services/email-creator-service";
import { Either, right, left } from "../../shared/logic/either";
import { ValidationError } from "../../shared/errors/validation-error";

type EmailData = Record<string, unknown>;

@injectable()
export class ReactEmailCreatorService implements EmailCreatorService {
  public createEmail(
    emailType: string,
    emailData: EmailData,
  ): Either<ValidationError, Email> {
    const errorOrEmailFC = this.getEmailFC(emailType);

    if (errorOrEmailFC.isLeft()) {
      const error = errorOrEmailFC.value;
      return left(error);
    }

    const emailFC = errorOrEmailFC.value;
    const errorOrSuccessfulEmailDataValidation = this.validateEmailData(
      emailFC.propTypes,
      emailType,
      emailData
    );

    if (errorOrSuccessfulEmailDataValidation.isLeft()) {
      const error = errorOrSuccessfulEmailDataValidation.value;
      return left(error);
    }

    return right({
      subject: emailFC.subject,
      content: ReactDOMServer.renderToStaticMarkup(
        React.createElement(emailFC, emailData),
      ),
    });
  }

  private getEmailFC(emailType: string): Either<ValidationError, EmailFC> {
    try {
      /* eslint-disable-next-line @typescript-eslint/no-var-requires */
      const emailFC = require(
        path.join("../../emails", emailType),
      );

      return right(emailFC.default);
    } catch (err) {
      return left(new ValidationError(`emailType ${emailType} is not supported.`));
    }
  }

  private validateEmailData(
    propTypes: NonNullable<React.FC["propTypes"]>,
    emailType: string,
    emailData: EmailData
  ): Either<ValidationError, void> {
    try {
      // By default PropTypes.checkPropTypes shows a warning using console.error
      // We want to throw an error in that case to indicate that the input is invalid.
      /* eslint-disable no-console */
      const originalConsoleError = console.error;
      console.error = (message: string) => {
        throw new Error(message);
      }
      PropTypes.checkPropTypes(
        propTypes,
        emailData,
        "prop",
        emailType,
      );
      console.error = originalConsoleError;
      /* eslint-enable no-console */
      
      return right(undefined);
    } catch (error) {
      return left(new ValidationError(error.message));
    }
  }
}
