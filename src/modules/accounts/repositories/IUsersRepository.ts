/**
 * @Author: Jefferson Charlles
 * @Date:   2021-10-07 04:31:24
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 01:28:15
 */
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/User';

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(user_id: string): Promise<User>;
}

export { IUsersRepository };
