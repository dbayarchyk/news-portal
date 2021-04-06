import { injectable } from "inversify";
import nodemailer from "nodemailer";

import { EmailClientService, EmailData } from "../../application/services/email-client-service";

@injectable()
export class NodemailerEmailClientService implements EmailClientService {
  public async sendEmail(emailData: EmailData): Promise<void> {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    const emailInfo = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: emailData.recipientEmails,
      subject: emailData.subject,
      html: emailData.content,
    });

    /* eslint-disable-next-line no-console */
    console.log(emailInfo);
  }
}
