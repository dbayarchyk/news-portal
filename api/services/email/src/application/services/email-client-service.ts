export interface EmailData {
  recipientEmails: string[];
  subject: string;
  content: string;
}

export interface EmailClientService {
  sendEmail(emailData: EmailData): Promise<void>;
}
