"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetAllCategoryController = void 0;

var _tsyringe = require("tsyringe");

var _GetAllCategoryUseCase = require("./GetAllCategoryUseCase");

class GetAllCategoryController {
  async handle(request, response) {
    const getAllCategoryUseCase = _tsyringe.container.resolve(_GetAllCategoryUseCase.GetAllCategoryUseCase);

    const all = await getAllCategoryUseCase.execute();
    return response.json(all);
  }

}

exports.GetAllCategoryController = GetAllCategoryController;