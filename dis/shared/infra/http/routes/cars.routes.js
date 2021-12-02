"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carsRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _CreateCarController = require("../../../../modules/cars/useCases/createCar/CreateCarController");

var _CreateCarSpecificationController = require("../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController");

var _GetAvailableCarsController = require("../../../../modules/cars/useCases/GetAvailableCars/GetAvailableCarsController");

var _UploadCarImageController = require("../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const carsRoutes = (0, _express.Router)();
exports.carsRoutes = carsRoutes;
const createCarController = new _CreateCarController.CreateCarController();
const getAvailableCarsController = new _GetAvailableCarsController.GetAvailableCarsController();
const createCarSpecificationController = new _CreateCarSpecificationController.CreateCarSpecificationController();
const uploadCarImageController = new _UploadCarImageController.UploadCarImageController();
const upload = (0, _multer.default)(_upload.default);
/*= ================================================================================== */

/*= ================================================================================== */

carsRoutes.post('/', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarController.handle); // ele verifica se ele esta autenticado e se ele e admin

/*= ================================================================================== */

carsRoutes.get('/available', getAvailableCarsController.handle);
/*= ================================================================================== */

carsRoutes.post('/specifications/:id', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarSpecificationController.handle);
/*= ================================================================================== */

carsRoutes.post('/images/:id', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, upload.array('images'), uploadCarImageController.handle);
/*= ================================================================================== */