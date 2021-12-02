"use strict";

var _tsyringe = require("tsyringe");

var _EtherealMailProvider = require("./implementations/EtherealMailProvider");

var _SESMail = require("./implementations/SESMail");

/**
 * @Author: Jefferson Charlles
 * @Date:   2021-12-01 21:35:02
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 03:29:24
 */
// const mailProvider = {
//     ethereal: container.resolve(),
//     ses: container.resolve(SESMail),
// };
if (process.env.MAIL_PROVIDER === 'ses') {
  _tsyringe.container.registerInstance('MailProvider', new _SESMail.SESMail());
} else {
  _tsyringe.container.registerInstance('MailProvider', new _EtherealMailProvider.EtherealMailProvider());
}