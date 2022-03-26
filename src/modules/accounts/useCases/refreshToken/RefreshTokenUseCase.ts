import { inject, injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken";

import auth from "@config/auth";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private userTokensRepository: IUsersTokensRepository,

    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<string> {
    const { secret_refresh_token, expires_refresh_token_days } = auth;

    // Verificando se o token recebido é valido
    const { email, sub } = verify(token, secret_refresh_token) as IPayload;

    const user_id = sub;

    // Validando se o token recebido possui o id de um usuário existente
    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      );

    if (!userToken) throw new AppError("Refresh token does not exists");

    // Se o token existir eu apago ele
    await this.userTokensRepository.deleteById(userToken.id);

    // E ai gero um novo refresh token
    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: sub,
      expiresIn: expires_refresh_token_days,
    });

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

    await this.userTokensRepository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
