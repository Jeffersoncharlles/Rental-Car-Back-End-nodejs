"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordUserUseCase = void 0;

var _bcryptjs = require("bcryptjs");

var _tsyringe = require("tsyringe");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _IUsersTokensRepository = require("../../repositories/IUsersTokensRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let ResetPasswordUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersTokensRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DayjsDateProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ResetPasswordUserUseCase {
  constructor(tokenRepository, usersRepository, dateProvider) {
    this.tokenRepository = tokenRepository;
    this.usersRepository = usersRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    token,
    password
  }) {
    // verificar se o token e valido
    const verifyToken = await this.tokenRepository.findByRefreshToken(token);

    if (!verifyToken) {
      throw new _AppError.AppError('Token invalid!');
    } // verificar se o token nao venceu


    const verifyDate = this.dateProvider.compareIfBefore(verifyToken.expires_date, this.dateProvider.dateNow());

    if (verifyDate) {
      throw new _AppError.AppError('Token expired!!');
    } // buscar o usuario


    const user = await this.usersRepository.findById(verifyToken.user_id); // criptografar o password novo

    user.password = await (0, _bcryptjs.hash)(password, 8); // update

    await this.usersRepository.create(user);
    await this.tokenRepository.deleteByID(verifyToken.id);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ResetPasswordUserUseCase = ResetPasswordUserUseCase;