import { container } from "tsyringe";

import "@shared/container/providers";

// Category
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";

// Specification
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";

// User
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

// Car
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";

// Upload car images
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";

// Rental
import { IRentalsRepository } from "@modules/rentals/infra/typeorm/repositories/IRentalsRepository";
import { RentalsRepository } from "@modules/rentals/repositories/RentalsRepository";

/** <>: Tipo do container. (""): Qualquer nome pro container. (): Classe do container criado */

// Category
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository,
);

// Specification
container.registerSingleton<ISpecificationsRepository>(
  "SpecificationRepository",
  SpecificationRepository,
);

// User
container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

// Car
container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

// Upload car images
container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository,
);

// Rental
container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository,
);
