import { inject, injectable } from 'tsyringe';
import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

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
