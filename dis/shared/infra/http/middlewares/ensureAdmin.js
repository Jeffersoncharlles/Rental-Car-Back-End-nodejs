"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAdmin = void 0;

var _UsersRepository = require("../../../../modules/accounts/infra/typeorm/repositories/UsersRepository");

var _AppError = require("../../../errors/AppError");

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const ensureAdmin = async (req, res, next) => {
  const {
    id
  } = req.user;
  const usersRepository = new _UsersRepository.UsersRepository();
  const user = await usersRepository.findById(id); // verificar se ele e admin

  if (!user.isAdmin) {
    throw new _AppError.AppError("User isn't admin!");
  }

  return next();
};

exports.ensureAdmin = ensureAdmin;