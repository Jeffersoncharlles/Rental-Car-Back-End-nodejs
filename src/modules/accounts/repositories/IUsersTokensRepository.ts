import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../infra/typeorm/UserTokens';

interface IUsersTokensRepository {
    findById(user_id: string): Promise<UserTokens>;
    create({
        user_id,
        refresh_token,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserTokens>;
}

export { IUsersTokensRepository };
