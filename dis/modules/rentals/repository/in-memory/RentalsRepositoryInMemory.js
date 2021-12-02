"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepositoryInMemory = void 0;

var _Rental = require("../../infra/typeorm/Rental");

class RentalsRepositoryInMemory {
  constructor() {
    this.rentals = [];
  }

  /*= ================= DIVISION ================= */

  /*= ================= DIVISION ================= */
  async create({
    car_id,
    user_id,
    expected_return_date
  }) {
    const rental = new _Rental.Rental();
    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date()
    });
    this.rentals.push(rental);
    return rental;
  }
  /*= ================= DIVISION ================= */

  /*= ================= DIVISION ================= */


  async findByCar(car_id) {
    return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
  }
  /*= ================= DIVISION ================= */

  /*= ================= DIVISION ================= */


  async findByOpenRentalByUser(user_id) {
    return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
  }
  /*= ================= DIVISION ================= */

  /*= ================= DIVISION ================= */


  async findByUserId(user_id) {
    return this.rentals.filter(rental => rental.user_id === user_id);
  }
  /*= ================= DIVISION ================= */

  /*= ================= DIVISION ================= */


  async findByID(id) {
    return this.rentals.find(rental => rental.id === id);
  }

}

exports.RentalsRepositoryInMemory = RentalsRepositoryInMemory;