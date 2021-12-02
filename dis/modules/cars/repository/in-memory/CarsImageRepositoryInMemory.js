"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsImageRepositoryInMemory = void 0;

var _CarImage = require("../../infra/typeorm/CarImage");

/** ============================================
 *               CAR IMAGES IN-MEMORY
 *=============================================* */
class CarsImageRepositoryInMemory {
  constructor() {
    this.carImage = [];
  }

  /*= ========================================================================== */

  /*= ================================ CREATE ================================== */
  async create(car_id, image_name) {
    const carImages = new _CarImage.CarImage();
    Object.assign(carImages, {
      car_id,
      image_name
    });
    this.carImage.push(carImages);
    return carImages;
  }
  /*= ========================================================================== */

  /*= =============================== FIND-BY-ID =============================== */


  async findById(id) {
    return this.carImage.find(img => img.id === id);
  }
  /*= ========================================================================== */


}

exports.CarsImageRepositoryInMemory = CarsImageRepositoryInMemory;