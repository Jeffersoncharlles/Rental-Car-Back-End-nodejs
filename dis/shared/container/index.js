"use strict";

var _tsyringe = require("tsyringe");

require("./providers/MailsProvider");

require("./providers/DateProvider");

require("./providers/StorageProvider");

var _UsersRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersRepository");

var _UsersTokensRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository");

var _CarsImageRepository = require("../../modules/cars/infra/typeorm/repositories/CarsImageRepository");

var _CarsRepository = require("../../modules/cars/infra/typeorm/repositories/CarsRepository");

var _CategoriesRepository = require("../../modules/cars/infra/typeorm/repositories/CategoriesRepository");

var _SpecificationsRepository = require("../../modules/cars/infra/typeorm/repositories/SpecificationsRepository");

var _RentalsRepository = require("../../modules/rentals/infra/typeorm/repositories/RentalsRepository");

/**
 * @Author: Jefferson Charlles
 * @Date:   2021-10-07 04:31:24
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 01:01:44
 */

/** =======================
 *     COMMENT BLOCK
 *  Interfaces de repositorios
 *  fazer a injeção de dependencias
 *========================* */
// ICategoriesRepository
_tsyringe.container.registerSingleton('CategoriesRepository', _CategoriesRepository.CategoriesRepository);

_tsyringe.container.registerSingleton('SpecificationsRepository', _SpecificationsRepository.SpecificationsRepository);

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.UsersRepository);

_tsyringe.container.registerSingleton('CarsRepository', _CarsRepository.CarsRepository);

_tsyringe.container.registerSingleton('CarsImagesRepository', _CarsImageRepository.CarsImageRepository);

_tsyringe.container.registerSingleton('RentalsRepository', _RentalsRepository.RentalsRepository);

_tsyringe.container.registerSingleton('UsersTokensRepository', _UsersTokensRepository.UsersTokensRepository);