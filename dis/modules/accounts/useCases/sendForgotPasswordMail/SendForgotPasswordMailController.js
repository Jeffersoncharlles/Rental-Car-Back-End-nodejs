"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendForgotPasswordMailController = void 0;

var _tsyringe = require("tsyringe");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

/**
 * @Author: Jefferson Charlles
 * @Date:   2021-11-30 12:51:13
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 01:30:21
 */
class SendForgotPasswordMailController {
  async handle(req, res) {
    const {
      email
    } = req.body;

    const sendForgotPasswordMailUseCase = _tsyringe.container.resolve(_SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase);

    sendForgotPasswordMailUseCase.execute(email);
    return res.send();
  }

}

exports.SendForgotPasswordMailController = SendForgotPasswordMailController;