import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoriesDTO } from "../ICategoriesRepository";

/**
 * Igual ao implementation, porém dados em array
 */

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  async create({ name, description }: ICreateCategoriesDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, { name, description });

    this.categories.push(category);
  }

  async list(): Promise<Category[]> {
    const categories = this.categories;

    return categories;
  }

  async findByName(categoryName: string): Promise<Category> {
    const category =
      this.categories.find((category) => category.name === categoryName);

    return category;
  }
};

export { CategoriesRepositoryInMemory };
