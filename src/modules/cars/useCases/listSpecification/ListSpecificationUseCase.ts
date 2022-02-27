import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

class ListSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) { };

  execute(): Specification[] {
    return this.specificationRepository.list();
  }
};

export { ListSpecificationUseCase };
