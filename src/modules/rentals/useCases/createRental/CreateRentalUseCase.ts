import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/infra/typeorm/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(
    private rentalsRepository: IRentalsRepository,

    private dateProvider: IDateProvider,
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumHourForRental = 24;

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

    // O Aluguel deve ter duração mínima de 24h
    const dateNow = this.dateProvider.dateNow();
    const compareDates = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    );

    if (compareDates < minimumHourForRental)
      throw new AppError("Invalid return time");

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
