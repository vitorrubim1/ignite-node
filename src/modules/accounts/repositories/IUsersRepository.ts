import { User } from "@modules/accounts/entities/User";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
};

export { IUsersRepository };
