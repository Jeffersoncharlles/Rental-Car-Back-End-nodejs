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
