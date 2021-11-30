import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UsersTokensRepository')
        private tokensRepository: IUsersTokensRepository,
        @inject('DayjsDateProvider')
        private dayProvider: IDateProvider
    ) {}

    async execute(email: string) {
        const timeExpire = 3;

        // verificando usuario
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists!');
        }

        // token do link em uuid para ficar menor
        const token = uuidV4();

        // criando data de expiracao
        const expiresDate = this.dayProvider.addHours(timeExpire);

        await this.tokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date: expiresDate,
        });
    }
}

export { SendForgotPasswordMailUseCase };
