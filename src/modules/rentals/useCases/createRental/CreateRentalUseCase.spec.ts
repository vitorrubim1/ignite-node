import { RentalsRepositoryInMemory } from "@modules/rentals/infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    await createRentalUseCase.execute({
      user_id: "123",
      car_id: "1234",
      expected_return_date: new Date(),
    });
  });
});
