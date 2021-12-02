"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppError = void 0;

class AppError {
  constructor(message, statusCode = 400) {
    this.message = void 0;
    this.statusCode = void 0;
    this.message = message;
    this.statusCode = statusCode;
  }

}
/*= ============== new error personal ============== */

/** =======================
 *     COMMENT BLOCK
 *  statusCode padrao e 400
 *  por isso nao ta definido como number
 *
 *========================* */


exports.AppError = AppError;