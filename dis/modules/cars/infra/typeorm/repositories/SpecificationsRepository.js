"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepository = void 0;

var _typeorm = require("typeorm");

var _Specification = require("../Specification");

class SpecificationsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Specification.Specification);
  }
  /*= ================================================================================== */

  /*= =================================CREATE============================================ */


  async create({
    name,
    description
  }) {
    const specification = this.repository.create({
      name,
      description
    });
    const specifications = await this.repository.save(specification);
    return specifications;
  }
  /*= ================================================================================== */

  /*= ==============================FIND-BY-NAME============================================ */


  async findByName(name) {
    const specification = await this.repository.findOne({
      name
    });
    return specification;
  }
  /*= ================================================================================== */

  /*= =================================GET-ALL============================================ */


  async getAll() {
    const getAll = await this.repository.find();
    return getAll;
  }
  /*= ================================================================================== */

  /*= =================================FIND-BY-IDS============================================ */


  async findByIds(ids) {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }

}

exports.SpecificationsRepository = SpecificationsRepository;