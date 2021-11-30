import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject('UsersTokensRepository')
        private tokenRepository: IUsersTokensRepository,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider
    ) {}
    async execute({ token, password }: IRequest): Promise<void> {
        // verificar se o token e valido
        const verifyToken = await this.tokenRepository.findByRefreshToken(
            token
        );

        if (!verifyToken) {
            throw new AppError('Token invalid!');
        }

        // verificar se o token nao venceu
        const verifyDate = this.dateProvider.compareIfBefore(
            verifyToken.expires_date,
            this.dateProvider.dateNow()
        );
        if (verifyDate) {
            throw new AppError('Token expired!!');
        }

        // buscar o usuario
        const user = await this.usersRepository.findById(verifyToken.user_id);

        // criptografar o password novo
        user.password = await hash(password, 8);

        // update
        await this.usersRepository.create(user);

        await this.tokenRepository.deleteByID(verifyToken.id);
    }
}

export { ResetPasswordUserUseCase };
