/**
 * @Author: Jefferson Charlles
 * @Date:   2021-11-30 18:29:03
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 01:28:31
 */
import { ICreateUserTokenDTO } from '../../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../../infra/typeorm/UserTokens';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    usersTokens: UserTokens[] = [];
    async findById(user_id: string): Promise<UserTokens> {
        return this.usersTokens.find((ut) => ut.user_id === user_id);
    }
    async create({
        user_id,
        refresh_token,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const user = new UserTokens();

        Object.assign(user, {
            expires_date,
            refresh_token,
            user_id,
        });

        this.usersTokens.push(user);

        return user;
    }
    async findByUserIdAndToken(
        user_id: string,
        token: string
    ): Promise<UserTokens> {
        const userToken = this.usersTokens.find(
            (u) => u.user_id === user_id && u.refresh_token === token
        );

        return userToken;
    }
    async deleteByID(id: string): Promise<void> {
        const token = this.usersTokens.find((ut) => ut.id === id);
        this.usersTokens.splice(this.usersTokens.indexOf(token));
    }
    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        return this.usersTokens.find(
            (ut) => ut.refresh_token === refresh_token
        );
    }
}

export { UsersTokensRepositoryInMemory };
