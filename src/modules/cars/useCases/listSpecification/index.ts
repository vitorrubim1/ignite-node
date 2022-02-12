import { SpecificationRepository } from '../../repositories/implementations/SpecificationsRepository';
import { ListSpecificationUseCase } from './ListSpecificationUseCase';
import { ListSpecificationController } from './ListSpecificationController';

const specificationRepository = SpecificationRepository.getInstance();
const listSpecificationUseCase = new ListSpecificationUseCase(specificationRepository);
const listSpecificationController = new ListSpecificationController(listSpecificationUseCase);

export { listSpecificationController };
