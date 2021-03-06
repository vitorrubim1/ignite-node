import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoriesDTO,
} from "@modules/cars/repositories/ICategoriesRepository";

/**
 * Igual ao implementation, porém dados em array para testes
 */

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  async create({ name, description }: ICreateCategoriesDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, { name, description });

    this.categories.push(category);
  }

  async list(): Promise<Category[]> {
    const { categories } = this;

    return categories;
  }

  async findByName(categoryName: string): Promise<Category> {
    const category = this.categories.find((item) => item.name === categoryName);

    return category;
  }
}

export { CategoriesRepositoryInMemory };
