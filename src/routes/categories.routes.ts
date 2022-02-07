import { Router, Request, Response } from "express";

// Repositório com os métodos
import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";

// Service
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

// Instâncias
const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request: Request, response: Response) => {
  const { name, description } = request.body;

  // Instanciando e executando o service
 const createCategoryService = new CreateCategoryService(categoriesRepository);
 createCategoryService.execute({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get("/", (request: Request, response: Response) => {
  const categories = categoriesRepository.list();

  return response.status(201).json(categories);
});

export { categoriesRoutes };
