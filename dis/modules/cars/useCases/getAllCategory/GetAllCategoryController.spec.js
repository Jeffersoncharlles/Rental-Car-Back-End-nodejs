"use strict";

var _bcryptjs = require("bcryptjs");

var _supertest = _interopRequireDefault(require("supertest"));

var _uuid = require("uuid");

var _app = require("../../../../shared/infra/http/app");

var _typeorm = _interopRequireDefault(require("../../../../shared/infra/typeorm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe('Get All Category', () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.default)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcryptjs.hash)('admin', 8);
    const name = 'admin';
    const email = 'email@email.com';
    const license = 'XXXXXXX';
    await connection.query(`INSERT INTO USERS(id, name ,email,password,driver_license,"isAdmin", created_at)
                values('${id}','${name}','${email}','${password}','${license}', true, 'now()')
            `);
  });
  it('should be able to list all  Categories', async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post('/sessions').send({
      email: 'email@email.com',
      password: 'admin'
    });
    const {
      token
    } = responseToken.body;
    await (0, _supertest.default)(_app.app).post('/categories').send({
      name: 'Category SuperTest',
      description: 'Category SuperTest'
    }).set({
      Authorization: `Bearer ${token}`
    });
    const response = await (0, _supertest.default)(_app.app).get('/categories');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});