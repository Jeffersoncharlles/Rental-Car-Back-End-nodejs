"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Car = require("../Car");

class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Car.Car);
  }
  /*= ================= DIVISION ================= */

  /*= ================= create ================= */


  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id
  }) {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id
    });
    await this.repository.save(car);
    return car;
  }
  /*= ================= DIVISION ================= */

  /*= ================= findByLincesPlate ================= */


  async findByLincesPlate(license_plate) {
    const car = await this.repository.findOne({
      license_plate
    });
    return car;
  }
  /*= ================= DIVISION ================= */

  /*= ================= findAvailable ================= */


  async findAvailable(brand, category_id, name) {
    const carsQuery = await this.repository.createQueryBuilder('cars').where('available = :available', {
      available: true
    });

    if (brand) {
      carsQuery.andWhere('brand = :brand', {
        brand
      });
    }

    if (name) {
      carsQuery.andWhere('name = :name', {
        name
      });
    }

    if (category_id) {
      carsQuery.andWhere('category_id = :category_id', {
        category_id
      });
    }

    const cars = await carsQuery.getMany();
    return cars; // getMany e para retornar todos os resultados
  }
  /*= ================= DIVISION ================= */

  /*= ================= FindByID ================= */


  async findById(id) {
    const car = await this.repository.findOne(id);
    return car;
  }
  /*= ================= DIVISION ================= */

  /*= ================= updateAvailable ================= */


  async updateAvailable(id, available) {
    const car = await this.repository.createQueryBuilder().update().set({
      available
    }).where('id = :id').setParameters({
      id
    }).execute(); // Update cars set available = 'true' where id = :id
  }

}

exports.CarsRepository = CarsRepository;