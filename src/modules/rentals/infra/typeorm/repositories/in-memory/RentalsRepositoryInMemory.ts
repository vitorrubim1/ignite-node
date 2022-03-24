import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalsDTO";
import { Rental } from "../../entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.car_id === car_id && !rental.end_date,
    );
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.user_id === user_id && !rental.end_date,
    );
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find(item => item.id === id);

    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rental = this.rentals.filter(item => item.user_id === user_id);

    return rental;
  }
}

export { RentalsRepositoryInMemory };
