import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

import { AppError } from "../../../../errors/AppError";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: '000111222',
      email: 'vitor@gmail.com',
      password: "1234",
      name: "user test"
    };

    // Creating an user
    await createUserUseCase.execute(user);

    // Authenticating an user
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty('token');
  });

  it("should not be able to authenticate a nonexistent user", () => {
    expect(async () => {
      const result = await authenticateUserUseCase.execute({
        email: 'nonexistent@email.com',
        password: 'nonexistent_password'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", async () => {
    expect(async() => {
      const user: ICreateUserDTO = {
        driver_license: '000111222',
        email: 'vitor@gmail.com',
        password: "1234",
        name: "user test"
      };

      // Creating an user
      await createUserUseCase.execute(user);

      // Authenticating an user
      const result = await authenticateUserUseCase.execute({
        email: user.email,
        password: 'nonexistent_password'
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
