import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    // Creating a car to perform the listing below
    const car = await carsRepositoryInMemory.create({
      name: 'Car test',
      description: 'Car description test',
      daily_rate: 200,
      license_plate: 'TEST-123',
      fine_amount: 250,
      brand: 'Brand test',
      category_id: 'category_id_test',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    // Espero que pelo menos um objeto do array seja igual ao que objeto de carro criado acima
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car test2',
      description: 'Car description test2',
      daily_rate: 200,
      license_plate: 'TEST-123',
      fine_amount: 250,
      brand: 'Brand test2',
      category_id: 'category_id_test2',
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: 'Brand test2' });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car test3',
      description: 'Car description test3',
      daily_rate: 200,
      license_plate: 'TEST-123',
      fine_amount: 250,
      brand: 'Brand test2',
      category_id: 'category_id_test3',
    });

    const cars = await listAvailableCarsUseCase.execute({ name: 'Car test3' });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car test4',
      description: 'Car description test4',
      daily_rate: 200,
      license_plate: 'TEST-123',
      fine_amount: 250,
      brand: 'Brand test2',
      category_id: 'category_id_test4',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category_id_test4',
    });

    expect(cars).toEqual([car]);
  });
});
