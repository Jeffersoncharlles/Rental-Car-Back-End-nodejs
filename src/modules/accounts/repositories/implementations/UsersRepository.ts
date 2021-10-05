import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    /*= ====== DIVISION ======= */
    /*= ====== create ======= */
    async create({
        name,
        email,
        driver_license,
        password,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            driver_license,
            password,
        });

        await this.repository.save(user);
    }
    /*= ====== DIVISION ======= */
    /*= ====== findById ======= */
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        return user;
    }
    /*= ====== DIVISION ======= */
    /*= ====== findByEmail ======= */
    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });

        return user;
    }
}

export { UsersRepository };
