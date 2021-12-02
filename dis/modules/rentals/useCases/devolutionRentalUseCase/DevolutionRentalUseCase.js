"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevolutionRentalUseCase = void 0;

var _tsyringe = require("tsyringe");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _ICarsRepository = require("../../../cars/repository/ICarsRepository");

var _IRentalsRepository = require("../../repository/IRentalsRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let DevolutionRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('RentalsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CarsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DayjsDateProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRentalsRepository.IRentalsRepository === "undefined" ? Object : _IRentalsRepository.IRentalsRepository, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class DevolutionRentalUseCase {
  constructor(rentalsRepository, carsRepository, dateProvider) {
    this.rentalsRepository = rentalsRepository;
    this.carsRepository = carsRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    id,
    user_id
  }) {
    const minimumDaily = 1;
    const rental = await this.rentalsRepository.findByID(id);
    const car = await this.carsRepository.findById(rental.car_id);

    if (!rental) {
      throw new _AppError.AppError('Rental this not Exists!');
    } // verificar a diarias quantas diarias tem esse aluguel


    let dailyCompare = this.dateProvider.compareInDays(rental.start_date, this.dateProvider.dateNow());

    if (dailyCompare <= 0) {
      dailyCompare = minimumDaily;
    } // verificar se tem multa de atraso


    const delayCompare = this.dateProvider.compareInDays(this.dateProvider.dateNow(), rental.start_date); // verificar quanto tem total de multas

    let total = 0;

    if (delayCompare > 0) {
      const calculateFine = delayCompare * car.fine_amount; // se tiver multa multiplica os dias de multa por quantidade de multas anterior

      total = calculateFine;
    } // total = total + daily * car.daily_rate


    total += dailyCompare * car.daily_rate; // total ate aqui e igual + dias alugados + diarias

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total; // o dia final e agora
    // e to passando para o valor total que esta agora depois de multas e dias

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true); // true para dizer que ta liberado partir de agora

    return rental;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.DevolutionRentalUseCase = DevolutionRentalUseCase;