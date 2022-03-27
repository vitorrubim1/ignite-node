interface ISendEmailProps {
  to: string;
  subject: string;
  body: string;
}

interface IMailProvider {
  sendMail({ to, subject, body }: ISendEmailProps): Promise<void>;
}

export type { ISendEmailProps, IMailProvider };
