import { Router } from "express";
import multer from 'multer';

// Middlewares
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

// Repositório com os métodos
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryUseController";


// Instâncias
const categoriesRoutes = Router();
const upload = multer({ dest: './tmp' });

// Controllers
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post(
  "/import",
  upload.single("file"),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
);

export { categoriesRoutes };
