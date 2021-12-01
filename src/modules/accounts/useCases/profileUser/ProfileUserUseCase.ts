import { inject, injectable } from 'tsyringe';

import { User } from '../../infra/typeorm/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class ProfileUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute(id: string): Promise<User> {
        const user = await this.usersRepository.findById(id);

        return user;
    }
}

export { ProfileUserUseCase };
