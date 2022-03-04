import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create a car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car test",
      description: "Description car test",
      daily_rate: 100,
      license_plate: "abc1234",
      fine_amount: 60,
      brand: "Brand test",
      category_id: "category_id"
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        description: "Description car 1",
        daily_rate: 100,
        license_plate: "abc1234",
        fine_amount: 60,
        brand: "Brand test",
        category_id: "category_id"
      });

      await createCarUseCase.execute({
        name: "Car 2",
        description: "Description car 2",
        daily_rate: 200,
        license_plate: "abc1234",
        fine_amount: 100,
        brand: "Brand test",
        category_id: "category_id"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available tru by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car test",
      description: "Description car test",
      daily_rate: 100,
      license_plate: "abc1234",
      fine_amount: 60,
      brand: "Brand test",
      category_id: "category_id"
    });

    expect(car.available).toBe(true);
  });
});
