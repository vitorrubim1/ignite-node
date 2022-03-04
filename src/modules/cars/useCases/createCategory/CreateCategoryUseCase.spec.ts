import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

import { AppError } from "@shared/errors/AppError";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create a Category", () => {
  // Antes de todos os teste executarei essas instâncias
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category name test",
      description: "Category description test"
    };

    /**
     * O método de criação não tem retorno. É "Void". Então busco pelo name pra verificar se houve êxito
     */
    await createCategoryUseCase.execute(category);

    const categoryCreated =
      await categoriesRepositoryInMemory.findByName(category.name);

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with name exists", async () => {
    expect(async () => {
      const category = {
        name: "Category name test",
        description: "Category description test"
      };

      await createCategoryUseCase.execute(category);

      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
