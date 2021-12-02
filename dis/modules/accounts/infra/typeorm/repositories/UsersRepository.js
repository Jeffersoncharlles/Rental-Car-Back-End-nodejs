"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepository = void 0;

var _typeorm = require("typeorm");

var _User = require("../User");

class UsersRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_User.User);
  }
  /*= ====== DIVISION ======= */

  /*= ====== create ======= */


  async create({
    name,
    email,
    driver_license,
    password,
    avatar,
    id
  }) {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      avatar,
      id
    });
    await this.repository.save(user);
  }
  /*= ====== DIVISION ======= */

  /*= ====== findById ======= */


  async findById(id) {
    const user = await this.repository.findOne(id);
    return user;
  }
  /*= ====== DIVISION ======= */

  /*= ====== findByEmail ======= */


  async findByEmail(email) {
    const user = await this.repository.findOne({
      email
    });
    return user;
  }

}

exports.UsersRepository = UsersRepository;