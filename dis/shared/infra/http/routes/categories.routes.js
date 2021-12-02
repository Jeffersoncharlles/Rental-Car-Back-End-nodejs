"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoriesRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _CreateCategoryController = require("../../../../modules/cars/useCases/createCategory/CreateCategoryController");

var _GetAllCategoryController = require("../../../../modules/cars/useCases/getAllCategory/GetAllCategoryController");

var _ImportCategoryController = require("../../../../modules/cars/useCases/importCategory/ImportCategoryController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const categoriesRoutes = (0, _express.Router)();
exports.categoriesRoutes = categoriesRoutes;
const upload = (0, _multer.default)({
  dest: './tmp'
});
const createCategoryController = new _CreateCategoryController.CreateCategoryController();
const importCategoryController = new _ImportCategoryController.ImportCategoryController();
const getAllCategoryController = new _GetAllCategoryController.GetAllCategoryController();
/*= ================================================================================== */

/*= ================================================================================== */

categoriesRoutes.post('/', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCategoryController.handle); // para criar um novo carro precisa estar autenticado e tambem ser admin

/*= ================================================================================== */

categoriesRoutes.get('/', getAllCategoryController.handle);
/*= ================================================================================== */

categoriesRoutes.post('/import', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, upload.single('file'), importCategoryController.handle);
/*= ================================================================================== */