"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EtherealMailProvider = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let EtherealMailProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class EtherealMailProvider {
  // criar account test fake
  constructor() {
    this.client = void 0;

    _nodemailer.default.createTestAccount().then(account => {
      const transporter = _nodemailer.default.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      }); // criei o transporter e depois
      // defini o transporter do nodemailer como esse criado


      this.client = transporter;
    }).catch(err => console.error(err));
  }

  async sendMail(to, subject, variables, path) {
    // vou da um fs para lear o arquivo
    const templateFileCOntent = _fs.default.readFileSync(path).toString('utf-8'); // vou compilar para o handlebars entender


    const templateParse = _handlebars.default.compile(templateFileCOntent); // gero um template html passando as variaveis para o compilado


    const templateHTML = templateParse(variables);
    const message = await this.client.sendMail({
      to,
      from: 'Rentx <noreplay@rentx.com>',
      subject,
      html: templateHTML
    });
    console.log('Message sent: %s', message.messageId); // Preview only available when sending through an Ethereal account

    console.log('Preview URL: %s', _nodemailer.default.getTestMessageUrl(message));
  }

}) || _class) || _class) || _class);
exports.EtherealMailProvider = EtherealMailProvider;