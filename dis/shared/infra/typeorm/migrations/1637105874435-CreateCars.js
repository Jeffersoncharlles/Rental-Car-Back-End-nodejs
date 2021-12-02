"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCars1637105874435 = void 0;

var _typeorm = require("typeorm");

class CreateCars1637105874435 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'cars',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'description',
        type: 'varchar'
      }, {
        name: 'daily_rate',
        type: 'numeric'
      }, {
        name: 'available',
        type: 'boolean',
        default: true
      }, {
        name: 'license_plate',
        type: 'varchar'
      }, {
        name: 'fine_amount',
        type: 'numeric'
      }, {
        name: 'brand',
        type: 'varchar'
      }, {
        name: 'category_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'FKCategoryCar',
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
        columnNames: ['category_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('cars');
  }

}
/** =======================
 * criando relacionamento estrangeiro
 * referencedTableName = de onde ta vindo esse id
 * referencedColumnNames =  e a coluna na tabela
 * columnNames =  coluna da tabela criada agora
 *
 * onDelete = oque vai fazer quando tiver essa acao em categorias
 *========================* */


exports.CreateCars1637105874435 = CreateCars1637105874435;