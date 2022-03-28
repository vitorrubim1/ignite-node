import { IMailProvider, ISendEmailProps } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
  private message: any[] = [];

  async sendMail({
    to,
    subject,
    variables,
    path,
  }: ISendEmailProps): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}

export { MailProviderInMemory };
