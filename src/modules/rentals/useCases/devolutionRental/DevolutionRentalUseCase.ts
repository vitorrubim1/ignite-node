import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/infra/typeorm/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider,
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const dateNow = this.dateProvider.dateNow();
    const minimum_daily = 1;

    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    if (!rental) throw new AppError("Rental does not exist");

    // Verificando tempo de aluguel
    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    // Atribuindo valor mínimo, caso o carro seja entregue no mesmo dia
    if (daily <= 0) daily = minimum_daily;

    const deliveryDelay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date,
    );

    let total = 0;

    // Realizando cálculo de atraso na entrega do carro
    if (deliveryDelay > 0) {
      const calculate_fine = deliveryDelay * car.fine_amount;

      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = dateNow;
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true); // ficará disponível

    return rental;
  }
}

export { DevolutionRentalUseCase };
