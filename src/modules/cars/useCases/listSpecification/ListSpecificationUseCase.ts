import { inject, injectable } from 'tsyringe';

import { Specification } from '@modules/cars/entities/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

@injectable()
class ListSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationsRepository
  ) { };

  async execute(): Promise<Specification[]> {
    return await this.specificationRepository.list();
  }
};

export { ListSpecificationUseCase };
