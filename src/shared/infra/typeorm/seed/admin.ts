import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '../index';
// pegando o create connection

async function create() {
    const connection = await createConnection('localhost');

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
}

create().then(() => console.log('User admin created!'));
