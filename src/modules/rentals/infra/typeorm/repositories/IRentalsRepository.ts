import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalsDTO";
import { Rental } from "../entities/Rental";

interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental>;
  findById(id: string): Promise<Rental>;
}

export { IRentalsRepository };
