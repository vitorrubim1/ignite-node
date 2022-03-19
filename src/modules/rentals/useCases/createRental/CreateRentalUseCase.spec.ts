import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayJsDateProvider;

describe("Create rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "123",
      car_id: "1234",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "1234",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "1234",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "User test1",
        car_id: "12345",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "User test2",
        car_id: "12345",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", () => {
    expect(async () => {
      const currentDate = dayjs().toDate();

      await createRentalUseCase.execute({
        user_id: "User test2",
        car_id: "12345",
        expected_return_date: currentDate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
