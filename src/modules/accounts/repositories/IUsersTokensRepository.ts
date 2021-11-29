import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../infra/typeorm/UserTokens';

interface IUsersTokensRepository {
    findById(id: string);
    create({
        user_id,
        refresh_token,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserTokens>;
}

export { IUsersTokensRepository };
