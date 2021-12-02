"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _CarsRepositoryInMemory = require("../../repository/in-memory/CarsRepositoryInMemory");

var _SpecificationInMemory = require("../../repository/in-memory/SpecificationInMemory");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let createCarSpecificationUseCase;
let carsRepository;
let specificationsRepository;
describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepository = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationsRepository = new _SpecificationInMemory.SpecificationInMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepository, specificationsRepository);
  });
  it('should not be able to add a new specification to a now-existent car', async () => {
    const car_id = '123';
    const specifications_id = ['23123', '23123123'];
    await expect(createCarSpecificationUseCase.execute({
      car_id,
      specifications_id
    })).rejects.toEqual(new _AppError.AppError('Car does not exists!'));
  });
  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepository.create({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 1500,
      license_plate: 'ABC-1234',
      fine_amount: 800,
      brand: 'Brand',
      category_id: 'category'
    });
    const specificationCreate = await specificationsRepository.create({
      description: 'test',
      name: 'test'
    });
    const specifications_id = [specificationCreate.id];
    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    }); // espero que tenha a propriedade specifications

    expect(specificationCars).toHaveProperty('specifications');
    expect(specificationCars.specifications.length).toBe(1); // espero que o tamanho seja de 1
  });
});