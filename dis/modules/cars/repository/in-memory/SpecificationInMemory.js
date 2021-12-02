"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationInMemory = void 0;

var _Specification = require("../../infra/typeorm/Specification");

class SpecificationInMemory {
  constructor() {
    this.specifications = [];
  }

  /*= ================= DIVISION ================= */
  async getAll() {
    const all = this.specifications;
    return all;
  }
  /*= ================= DIVISION ================= */

  /*= ================= DIVISION ================= */

  /*= ================= DIVISION ================= */


  async create({
    description,
    name
  }) {
    const specification = new _Specification.Specification();
    Object.assign(specification, {
      description,
      name
    });
    this.specifications.push(specification);
    return specification;
  }
  /*= ================= DIVISION ================= */


  async findByName(name) {
    return this.specifications.find(s => s.name === name);
  }
  /*= ================= DIVISION ================= */


  async findByIds(ids) {
    const allSpecifications = this.specifications.filter(s => ids.includes(s.id));
    return allSpecifications;
  }
  /*= ================= DIVISION ================= */


}

exports.SpecificationInMemory = SpecificationInMemory;