import { hash } from 'bcryptjs';
import { getConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

async function create() {
    const connection = getConnection();

    const id = uuidV4();
    const password = await hash('admin', 8);
    const name = 'admin';
    const email = 'email@email.com';

    await connection.query(
        `INSERT INTO USERS(id, name ,email,password,admin, created_at)
            values(${id},${name},${email},${password}, true, ${new Date()})
        `
    );
}

create().then(() => console.log('User admin created!'));
