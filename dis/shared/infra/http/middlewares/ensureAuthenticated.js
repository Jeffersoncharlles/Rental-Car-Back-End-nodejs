"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../../config/auth"));

var _UsersRepository = require("../../../../modules/accounts/infra/typeorm/repositories/UsersRepository");

var _AppError = require("../../../errors/AppError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ensureAuthenticated = async (request, response, next) => {
  // padrao jwt Bearer espaco token passado
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.AppError('token missing', 401); // se nao tiver nada ja manda vazar
  }
  /**
   *
   *  vai dividir o array por espaco com split
   *  [0] posicao 0 ele vai vim o bearer
   *  [1] posicao 1 ele vai vim o token
   *  posicao 0 ignora e na posicao 1 coloca
   *  na variaveis token
   *
   *
   *
   * */


  const [, token] = authHeader.split(' '); //

  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secret_token);
    const usersRepository = new _UsersRepository.UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new _AppError.AppError('User does not exists!', 401);
    }

    request.user = {
      id: user_id
    };
    next();
  } catch (error) {
    throw new _AppError.AppError('Invalid token!', 401);
  }
};

exports.ensureAuthenticated = ensureAuthenticated;