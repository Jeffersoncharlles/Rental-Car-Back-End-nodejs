"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SESMail = void 0;

var _awsSdk = require("aws-sdk");

var _fs = _interopRequireDefault(require("fs"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SESMail = (_dec = (0, _tsyringe.injectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class SESMail {
  // criar account test fake
  constructor() {
    this.client = void 0;
    this.client = _nodemailer.default.createTransport({
      SES: new _awsSdk.SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_SES_VERSION
      })
    });
  }

  async sendMail(to, subject, variables, path) {
    // vou da um fs para lear o arquivo
    const templateFileCOntent = _fs.default.readFileSync(path).toString('utf-8'); // vou compilar para o handlebars entender


    const templateParse = _handlebars.default.compile(templateFileCOntent); // gero um template html passando as variaveis para o compilado


    const templateHTML = templateParse(variables);
    await this.client.sendMail({
      to,
      from: `${process.env.NAME_API} <${process.env.EMAIL_DOMAIN}>`,
      subject,
      html: templateHTML
    });
  }

}) || _class) || _class) || _class);
exports.SESMail = SESMail;