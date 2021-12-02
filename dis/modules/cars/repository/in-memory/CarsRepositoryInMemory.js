"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryInMemory = void 0;

var _Car = require("../../infra/typeorm/Car");

/* eslint-disable import/no-unresolved */
class CarsRepositoryInMemory {
  constructor() {
    this.cars = [];
  }

  /*= ========================================================================== */

  /*= =============================== CREATE =============================== */
  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    id
  }) {
    const cars = new _Car.Car();
    Object.assign(cars, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      id
    });
    this.cars.push(cars);
    return cars;
  }
  /*= ========================================================================== */

  /*= ========================== FIND-BY-LINCES PLATE ========================== */


  async findByLincesPlate(license_plate) {
    return this.cars.find(car => car.license_plate === license_plate);
  }
  /*= ========================================================================== */

  /*= ============================= FIND-AVAILABLE ============================= */


  async findAvailable(brand, category_id, name) {
    const cars = this.cars.filter(car => {
      if (car.available === true || brand && car.brand === brand || category_id && car.category_id === category_id || name && car.name === name) {
        return car;
      }

      return null;
      /** =======================
       *  car.available === true
       * condicao obrigatoria e os outros nao
       * pois ta usando o operator eee e nao o ou
       *========================* */
    }); // const cars = this.cars
    //     .filter((car) => car.available === true)
    //     .filter(
    //         (car) =>
    //             (brand && car.brand === brand) ||
    //             (category_id && car.category_id === category_id) ||
    //             (name && car.name === name)
    //     );

    /** =======================
     *  (car) => car.available === true
     * aqui ele verifica se o carro ta available
     *
     * (brand && car.brand === brand)
     * se o brand ta preenchido
     * e o car.brand for igual a brand
     *
     *========================* */

    return cars;
  }
  /*= ========================================================================== */

  /*= =============================== FIND-BY-ID =============================== */


  async findById(id) {
    return this.cars.find(car => car.id === id);
  }
  /*= ========================================================================== */


  async updateAvailable(id, available) {
    const findIndex = this.cars.findIndex(car => car.id === id);
    this.cars[findIndex].available = available;
  }

}

exports.CarsRepositoryInMemory = CarsRepositoryInMemory;