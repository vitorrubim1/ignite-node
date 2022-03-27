/* eslint-disable no-console */
import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider, ISendEmailProps } from "../IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    // Criando conta teste
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch(err => console.error(err));
  }

  async sendMail({ to, subject, body }: ISendEmailProps): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: "Appcar <nao_responda@appcar.com.br>",
      subject,
      text: body,
      html: body,
    });

    console.log("Mensagem enviada: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
