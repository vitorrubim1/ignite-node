import { getRepository, Repository } from "typeorm";

import { Specification } from "@modules/cars/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

class SpecificationRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return await this.repository.findOne({ name });
  }

  async list(): Promise<Specification[]> {
    return await this.repository.find();
  }
}

export { SpecificationRepository };
