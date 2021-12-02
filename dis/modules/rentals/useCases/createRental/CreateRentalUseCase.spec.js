"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _CarsRepositoryInMemory = require("../../../cars/repository/in-memory/CarsRepositoryInMemory");

var _RentalsRepositoryInMemory = require("../../repository/in-memory/RentalsRepositoryInMemory");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let rentalsRepositoryInMemory;
let carsRepositoryImemore;
let dateProvider;
describe('Create Rental', () => {
  const dayAdd24Hours = (0, _dayjs.default)().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    carsRepositoryImemore = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dateProvider, carsRepositoryImemore);
  });
  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryImemore.create({
      name: 'Test',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand'
    });
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });
  it('should be able to create a new rental if there is another open to  the same user', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: 'xxxx',
      expected_return_date: dayAdd24Hours,
      user_id: '12345'
    });
    await expect(createRentalUseCase.execute({
      user_id: '12345',
      car_id: '1212',
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("There's a rental in progress for user!")); // espero que seja rejeitado e contenha erro
  });
  it('should be able to create a new rental if there is another open to  the same car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: 'xxTest',
      expected_return_date: dayAdd24Hours,
      user_id: '12345'
    });
    await expect(createRentalUseCase.execute({
      user_id: '123456',
      car_id: 'xxTest',
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError('Car is unavailable')); // espero que seja rejeitado e contenha erro
  });
  it('should be able to create a new rental with invalid return time', async () => {
    await expect(createRentalUseCase.execute({
      user_id: '12345',
      car_id: '1212',
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppError.AppError('Invalid return time!')); // espero que seja rejeitado e contenha erro
  });
});