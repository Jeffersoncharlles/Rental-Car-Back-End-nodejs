"use strict";

var _bcryptjs = require("bcryptjs");

var _supertest = _interopRequireDefault(require("supertest"));

var _uuid = require("uuid");

var _app = require("../../../../shared/infra/http/app");

var _typeorm = _interopRequireDefault(require("../../../../shared/infra/typeorm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe('Create Category Controller', () => {
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
  it('should be able to create a new category', async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post('/sessions').send({
      email: 'email@email.com',
      password: 'admin'
    });
    const {
      token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post('/categories').send({
      name: 'Category SuperTest',
      description: 'Category SuperTest'
    }).set({
      Authorization: `Bearer ${token}`
    });
    expect(response.status).toBe(201);
  });
  it('should not be able to create a new category with name exists', async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post('/sessions').send({
      email: 'email@email.com',
      password: 'admin'
    });
    const {
      token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post('/categories').send({
      name: 'Category SuperTest',
      description: 'Category SuperTest'
    }).set({
      Authorization: `Bearer ${token}`
    });
    expect(response.status).toBe(400);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});