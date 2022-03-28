import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    // Ficar espiando pra ver se foi chamado
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "487174",
      email: "wa@jo.ae",
      name: "Leonard Harris",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("wa@jo.ae");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("nu@awmic.th"),
    ).rejects.toEqual(new AppError("User does not exist"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create",
    );

    usersRepositoryInMemory.create({
      driver_license: "065033",
      email: "wate@ho.ae",
      name: "Cameron McLaughlin",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("wate@ho.ae");

    expect(generateTokenMail).toBeCalled();
  });
});
