import { getRepository, Repository } from 'typeorm';

// Implementação da interface
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';

// O repositório é o responsável por ter os métodos que haverá nesse contexto
class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  // Informando a qual entidade terei as métodos do typeorm
  constructor() {
    this.repository = getRepository(Category);
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

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({ name });

    return category;
  }

  /**
  *
  */
}

export { CategoriesRepository };
