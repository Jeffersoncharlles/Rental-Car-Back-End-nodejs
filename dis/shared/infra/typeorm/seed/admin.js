"use strict";

var _bcryptjs = require("bcryptjs");

var _uuid = require("uuid");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// pegando o create connection
async function create() {
  const connection = await (0, _index.default)('localhost');
  const id = (0, _uuid.v4)();
  const password = await (0, _bcryptjs.hash)('admin', 8);
  const name = 'admin';
  const email = 'email@email.com';
  const license = 'XXXXXXX';
  await connection.query(`INSERT INTO USERS(id, name ,email,password,driver_license,"isAdmin", created_at)
            values('${id}','${name}','${email}','${password}','${license}', true, 'now()')
        `);
  await connection.close;
}

create().then(() => console.log('User admin created!'));