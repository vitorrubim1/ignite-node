/* eslint-disable no-console */
import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";

import { IMailProvider, ISendEmailProps } from "../IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.createClient();
  }

  private async createClient() {
    try {
      const account = await nodemailer.createTestAccount();

      // Criando conta teste
      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    } catch (err) {
      console.error(`EtherealMailProvider - Error:\n${err}`);
    }
  }

  async sendMail({
    to,
    subject,
    variables,
    path,
  }: ISendEmailProps): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "AppCar <nao_responda@appcar.com.br>",
      subject,
      html: templateHTML,
    });

    console.log("Mensagem enviada: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
