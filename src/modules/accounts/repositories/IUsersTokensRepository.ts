/**
 * @Author: Jefferson Charlles
 * @Date:   2021-11-29 14:44:49
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 01:28:39
 */
import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../infra/typeorm/UserTokens';

interface IUsersTokensRepository {
    findById(user_id: string): Promise<UserTokens>;
    create({
        user_id,
        refresh_token,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserTokens>;
    findByUserIdAndToken(user_id: string, token: string): Promise<UserTokens>;
    deleteByID(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}

export { IUsersTokensRepository };
