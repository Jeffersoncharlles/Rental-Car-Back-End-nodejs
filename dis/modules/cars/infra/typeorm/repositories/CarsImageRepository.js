"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsImageRepository = void 0;

var _typeorm = require("typeorm");

var _CarImage = require("../CarImage");

class CarsImageRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_CarImage.CarImage);
  }
  /*= ================= DIVISION ================= */

  /*= ================= DIVISION ================= */


  async create(car_id, image_name) {
    const carImage = this.repository.create({
      car_id,
      image_name
    });
    await this.repository.save(carImage);
    return carImage;
  }
  /*= ================= DIVISION ================= */

  /*= ================= DIVISION ================= */


  async findById(id) {
    const carImage = await this.repository.findOne(id);
    return carImage;
  }
  /*= ============================================ */

  /*= ============================================ */


}

exports.CarsImageRepository = CarsImageRepository;