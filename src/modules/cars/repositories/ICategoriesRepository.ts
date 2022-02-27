import { Category } from "../entities/Category";

interface ICreateCategoriesDTO {
  name: string;
  description: string;
}

// Implementação que deve ser seguida
interface ICategoriesRepository {
  create({ name, description }: ICreateCategoriesDTO): Promise<void>;
  list(): Promise<Category[]>;
  findByName(categoryName: string): Promise<Category | undefined>;
};

export { ICategoriesRepository, ICreateCategoriesDTO };
