import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationController } from '@modules/cars/useCases/listSpecification/ListSpecificationController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);
specificationsRoutes.get('/', listSpecificationController.handle);

export { specificationsRoutes };
