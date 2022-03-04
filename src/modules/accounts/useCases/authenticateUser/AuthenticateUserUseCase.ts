import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError("Email or password incorrect!");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError("Email or password incorrect!");

    const token = sign({}, "672a135ebf1008a734c1196d00f68e44", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        email: user.email,
        name: user.name
      },
    }

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
