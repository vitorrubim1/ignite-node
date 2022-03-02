import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';

// Implementação da interface
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

/**
 * O UseCase é responsável por toda regra de negocio (validações, criação...)
 * Ela injeta qual o nome da classe que quer
 * Ela recebe por parâmetro o repositório que ela irá trabalhar. Que passa a ser o "D" do SOLID
 */
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) throw new AppError("Category already exist");

    this.categoriesRepository.create({ name, description });
  };
}

export { CreateCategoryUseCase };
