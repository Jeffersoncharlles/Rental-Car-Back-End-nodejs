"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepositortyInMemory = void 0;

var _User = require("../../infra/typeorm/User");

/**
 * @Author: Jefferson Charlles
 * @Date:   2021-10-27 13:28:43
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 01:28:22
 */
class UsersRepositortyInMemory {
  constructor() {
    this.users = [];
  }

  async create({
    driver_license,
    email,
    name,
    password
  }) {
    const user = new _User.User();
    Object.assign(user, {
      driver_license,
      email,
      name,
      password
    });
    this.users.push(user);
  }

  async findByEmail(email) {
    return this.users.find(u => u.email === email);
  }

  async findById(id) {
    return this.users.find(u => u.id === id);
  }

}

exports.UsersRepositortyInMemory = UsersRepositortyInMemory;