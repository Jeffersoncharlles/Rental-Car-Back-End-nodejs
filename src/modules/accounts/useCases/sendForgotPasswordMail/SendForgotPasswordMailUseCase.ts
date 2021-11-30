import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '../../../../shared/container/providers/MailProvider/IMailProvider';
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
        private dayProvider: IDateProvider,
        @inject('EtherealMailProvider')
        private mailProvider: IMailProvider
    ) {}

    async execute(email: string): Promise<void> {
        const timeExpire = 3;

        // ler o path do templede
        const templatePath = resolve(
            __dirname,
            '..',
            '..',
            'views',
            'emails',
            'forgotPassword.hbs'
        );

        // verificando usuario
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists!');
        }

        // token do link em uuid para ficar menor
        const token = uuidV4();

        // criando data de expiracao
        const expiresDate = this.dayProvider.addHours(timeExpire);

        // criar e salvar o token
        await this.tokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date: expiresDate,
        });

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_EMAIL_URL}${token}`,
        };

        // sendemail
        await this.mailProvider.sendMail(
            email,
            'Recuperacao de senha',
            variables,
            templatePath
        );
    }
}

export { SendForgotPasswordMailUseCase };
