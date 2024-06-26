import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';

let connection: Connection;
describe('Get All Category', () => {
    beforeAll(async () => {
        connection = await createConnection();

        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash('admin', 8);
        const name = 'admin';
        const email = 'email@email.com';
        const license = 'XXXXXXX';

        await connection.query(
            `INSERT INTO USERS(id, name ,email,password,driver_license,"isAdmin", created_at)
                values('${id}','${name}','${email}','${password}','${license}', true, 'now()')
            `
        );
    });

    it('should be able to list all  Categories', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'email@email.com',
            password: 'admin',
        });

        const { token } = responseToken.body;

        await request(app)
            .post('/categories')
            .send({
                name: 'Category SuperTest',
                description: 'Category SuperTest',
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        const response = await request(app).get('/categories');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });
});
