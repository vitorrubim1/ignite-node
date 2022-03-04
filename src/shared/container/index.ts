import { container } from "tsyringe";

// Category
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/repositories/implementations/CategoriesRepository";

// Specification
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { SpecificationRepository } from "@modules/cars/repositories/implementations/SpecificationsRepository";

// User
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";

/** <>: Tipo do container. (""): Qualquer nome pro container. (): Classe do container criado */

// Category
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

// Specification
container.registerSingleton<ISpecificationsRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

// User
container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
