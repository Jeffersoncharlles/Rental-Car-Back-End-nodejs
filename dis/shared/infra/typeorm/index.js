"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

// interface IOptions {
//     host: string;
// }
// getConnectionOptions().then((options) => {
//     const newOptions = options as IOptions;
//     newOptions.host = 'database';
//     createConnection({
//         ...options,
//     });
// });
// pegando a conexao e passando ela para ser usada na aplicacao
var _default = async (host = 'database') => {
  const defaultOptions = await (0, _typeorm.getConnectionOptions)();
  return (0, _typeorm.createConnection)(Object.assign(defaultOptions, {
    host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
    database: process.env.NODE_ENV === 'test' ? 'rentx_test' : defaultOptions.database
  }));
};

exports.default = _default;