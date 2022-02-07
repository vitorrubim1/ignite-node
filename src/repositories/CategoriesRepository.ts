import { Category } from "../model/Category";

// Implementação da interface
import { ICategoriesRepository } from "./ICategoriesRepository";

// O repositório é o responsável por ter os métodos que haverá nesse contexto
class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  // Inicia a variável quando a classe for instanciada
  constructor() {
    this.categories = [];
  }

  /**
   * Métodos
   */
  create({ name, description }): void {
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
