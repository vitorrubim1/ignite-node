import { getRepository, Repository } from "typeorm";

import { Category } from "../../entities/Category";

// Implementação da interface
import { ICategoriesRepository } from "../ICategoriesRepository";

// O repositório é o responsável por ter os métodos que haverá nesse contexto
class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  private static INSTANCE: CategoriesRepository;

  // Informando a qual entidade terei as métodos do typeorm
  private constructor() {
    this.repository = getRepository(Category);
  }

  // Torno o constructor private e faço uma única instância para que os controller use a mesma
  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  /**
   * Métodos
   */
  async create({ name, description }): Promise<void> {
    const category = this.repository.create({ name, description });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(categoryName: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({ name })

    return category;
  }

  /**
  *
  */
}

export { CategoriesRepository };
