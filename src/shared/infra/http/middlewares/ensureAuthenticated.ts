import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError("Token missing", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "672a135ebf1008a734c1196d00f68e44",
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError("User does not exist", 401);

    // Adicionando no Request do express, pra que outros lugares tenham acesso ao id do user logado
    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}

export { ensureAuthenticated };
