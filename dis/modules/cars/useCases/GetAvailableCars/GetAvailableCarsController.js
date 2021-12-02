"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetAvailableCarsController = void 0;

var _tsyringe = require("tsyringe");

var _GetAvailableCarsUseCase = require("./GetAvailableCarsUseCase");

class GetAvailableCarsController {
  async handle(req, res) {
    const {
      brand,
      name,
      category_id
    } = req.query;

    const listAvailableCarsUseCase = _tsyringe.container.resolve(_GetAvailableCarsUseCase.GetAvailableCarsUseCase);

    const cars = await listAvailableCarsUseCase.execute({
      brand: brand,
      name: name,
      category_id: category_id
    }); // forcando reconhecer string

    return res.json(cars);
  }

}

exports.GetAvailableCarsController = GetAvailableCarsController;