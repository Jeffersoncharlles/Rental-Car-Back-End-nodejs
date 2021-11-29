import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '../../../dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '../../../repositories/IUsersTokensRepository';
import { UserTokens } from '../UserTokens';

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = getRepository(UserTokens);
    }

    async findById(user_id: string): Promise<UserTokens> {
        return this.repository.findOne({ user_id });
    }
    async create({
        user_id,
        refresh_token,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        await this.repository.save(userToken);

        return userToken;
    }
}

export { UsersTokensRepository };
