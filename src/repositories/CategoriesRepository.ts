import { Category } from "../model/Category";

interface ICreateCategoriesDTO {
  name: string;
  description: string;
}

class CategoriesRepository {
  private categories: Category[];

  // Inicia a variável quando a classe for instanciada
  constructor() {
    this.categories = [];
  }

  /**
   * Métodos
   */
  create({ name, description }: ICreateCategoriesDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date()
    })

    this.categories.push(category)
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(categoryName: string): Category | undefined {
    const category =
      this.categories.find((category) => category.name === categoryName);

    return category;
  }

  /**
  *
  */
}

export { CategoriesRepository };
