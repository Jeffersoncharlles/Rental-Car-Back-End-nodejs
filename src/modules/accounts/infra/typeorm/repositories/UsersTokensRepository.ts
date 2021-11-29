import { ICreateUserTokenDTO } from '../../../dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '../../../repositories/IUsersTokensRepository';
import { UserTokens } from '../UserTokens';

class UsersTokensRepository implements IUsersTokensRepository {
    async findById(id: string) {
        throw new Error('Method not implemented.');
    }
    async create({
        user_id,
        refresh_token,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        throw new Error('Method not implemented.');
    }
}

export { UsersTokensRepository };
