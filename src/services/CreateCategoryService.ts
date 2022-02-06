// Repositório com os métodos
import { CategoriesRepository } from "../repositories/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

/**
 * O service é responsável por toda regra de negocio (validações, criação...)
 * Ela recebe por parâmetro o repositório que ela irá trabalhar. Que passa a ser o "D" do SOLID
 */
class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) throw new Error("Category already exist");

    this.categoriesRepository.create({ name, description });
  };
}

export { CreateCategoryService };
