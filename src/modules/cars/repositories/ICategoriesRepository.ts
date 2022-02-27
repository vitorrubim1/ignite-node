import { Category } from "../entities/Category";

interface ICreateCategoriesDTO {
  name: string;
  description: string;
}

// Implementação que deve ser seguida
interface ICategoriesRepository {
  create({ name, description }: ICreateCategoriesDTO): void;
  list(): Category[];
  findByName(categoryName: string): Category | undefined;
};

export { ICategoriesRepository, ICreateCategoriesDTO };
