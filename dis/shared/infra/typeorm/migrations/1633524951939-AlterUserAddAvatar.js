"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserAddAvatar1633524951939 = void 0;

var _typeorm = require("typeorm");

class AlterUserAddAvatar1633524951939 {
  async up(queryRunner) {
    await queryRunner.addColumn('users', new _typeorm.TableColumn({
      name: 'avatar',
      type: 'varchar',
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('users', 'avatar');
  }

}

exports.AlterUserAddAvatar1633524951939 = AlterUserAddAvatar1633524951939;