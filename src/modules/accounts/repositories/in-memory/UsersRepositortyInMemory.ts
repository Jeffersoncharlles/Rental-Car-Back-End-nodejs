/**
 * @Author: Jefferson Charlles
 * @Date:   2021-10-27 13:28:43
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 01:28:22
 */
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../infra/typeorm/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositortyInMemory implements IUsersRepository {
    users: User[] = [];

    async create({
        driver_license,
        email,
        name,
        password,
    }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            driver_license,
            email,
            name,
            password,
        });

        this.users.push(user);
    }
    async findByEmail(email: string): Promise<User> {
        return this.users.find((u) => u.email === email);
    }
    async findById(id: string): Promise<User> {
        return this.users.find((u) => u.id === id);
    }
}

export { UsersRepositortyInMemory };
