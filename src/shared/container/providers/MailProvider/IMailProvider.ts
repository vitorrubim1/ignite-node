interface ISendEmailProps {
  to: string;
  subject: string;
  variables: any;
  path: string;
}

interface IMailProvider {
  sendMail({ to, subject, variables, path }: ISendEmailProps): Promise<void>;
}

export type { ISendEmailProps, IMailProvider };
