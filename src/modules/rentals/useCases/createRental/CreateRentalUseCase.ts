import { IRentalsRepository } from "@modules/rentals/infra/typeorm/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<void> {
    // Caso o carro já esteja alugado não será possível um criar um novo aluguel
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );

    if (carUnavailable) throw new AppError("Car is unavailable");

    // Se o usuário já tiver um aluguel em aberto não será possível criar outro
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    );

    if (rentalOpenToUser)
      throw new AppError("There's a rental in progress for user");
  }
}

export { CreateRentalUseCase };
