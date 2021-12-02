"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserDeleteUsername1633397692633 = void 0;

var _typeorm = require("typeorm");

class AlterUserDeleteUsername1633397692633 {
  async up(queryRunner) {
    await queryRunner.dropColumn('users', 'username');
  }

  async down(queryRunner) {
    await queryRunner.addColumn('users', new _typeorm.TableColumn({
      name: 'username',
      type: 'varchar'
    }));
  }

}

exports.AlterUserDeleteUsername1633397692633 = AlterUserDeleteUsername1633397692633;