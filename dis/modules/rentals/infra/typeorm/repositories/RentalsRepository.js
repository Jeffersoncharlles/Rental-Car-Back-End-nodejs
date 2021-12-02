"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepository = void 0;

var _typeorm = require("typeorm");

var _Rental = require("../Rental");

class RentalsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Rental.Rental);
  }
  /*= ================= DIVISION ================= */

  /*= ================= DIVISION ================= */


  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total
  }) {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total
    });
    await this.repository.save(rental);
    return rental;
  }
  /*= ================= DIVISION ================= */

  /*= ================= DIVISION ================= */


  async findByID(id) {
    const findId = await this.repository.findOne({
      id
    });
    return findId;
  }
  /*= ================= DIVISION ================= */

  /*= ================= DIVISION ================= */


  async findByOpenRentalByUser(user_id) {
    const openByUser = await this.repository.findOne({
      where: {
        user_id,
        end_date: null
      }
    }); // se existe esse usuario e se eo end date for null

    return openByUser;
  }
  /*= ================= DIVISION ================= */

  /*= ================= DIVISION ================= */


  async findByCar(car_id) {
    const openByCar = await this.repository.findOne({
      where: {
        car_id,
        end_date: null
      }
    });
    return openByCar;
  }
  /*= ================= DIVISION ================= */

  /*= ================= DIVISION ================= */


  async findByUserId(user_id) {
    const rentals = await this.repository.find({
      where: {
        user_id
      },
      relations: ['car']
    });
    return rentals;
  }
  /*= ================= DIVISION ================= */

  /*= ================= DIVISION ================= */


}

exports.RentalsRepository = RentalsRepository;