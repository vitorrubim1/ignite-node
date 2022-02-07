import { Category } from "../model/Category";

// Implementação da interface
import { ICategoriesRepository, ICreateCategoriesDTO } from "./ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoriesRepository {
  create({ name, description }: ICreateCategoriesDTO): void {
    console.log(name, description);
  }

  list(): Category[] {
    console.log('caiu no list');
    return null;
  }

  findByName(categoryName: string): Category {
    console.log(categoryName);
    return null;
  }

};
