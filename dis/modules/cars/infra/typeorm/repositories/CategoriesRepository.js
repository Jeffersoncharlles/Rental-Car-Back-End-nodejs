"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepository = void 0;

var _typeorm = require("typeorm");

var _Category = require("../Category");

// Singleton Pattern
class CategoriesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Category.Category);
  }
  /*= =================================CREATE============================================ */

  /*= ================================================================================== */


  async create({
    description,
    name
  }) {
    // void para falar que nao tem retorno
    const category = this.repository.create({
      description,
      name
    });
    await this.repository.save(category);
  }
  /*= ================================================================================== */

  /*= =================================GET-ALL============================================ */


  async getAll() {
    const categories = await this.repository.find();
    return categories;
  }
  /*= ================================================================================== */

  /*= =================================FIND-BY-NAME====================================== */


  async findByName(name) {
    // Select * from categories where name = "name" limite 1
    const category = await this.repository.findOne({
      name
    });
    return category;
  }
  /*= ================================================================================== */

  /*= =================================FIND-BY-NAME====================================== */


}

exports.CategoriesRepository = CategoriesRepository;