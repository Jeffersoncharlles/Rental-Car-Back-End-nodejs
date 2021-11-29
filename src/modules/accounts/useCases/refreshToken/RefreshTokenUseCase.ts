import { verify, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../../config/auth';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

interface IPayload {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject('UsersTokensRepository')
        private tokensRepository: IUsersTokensRepository,

        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider
    ) {}
    async execute(token: string): Promise<string> {
        // verifica se o token e valido
        const { email, sub } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayload;

        // pega o id do usuario do token
        const user_id = sub;

        // busca o token e verifica o usuario
        const userToken = await this.tokensRepository.findByUserIdAndToken(
            user_id,
            token
        );

        // se o token nao for o mesmo manda msg
        if (!userToken) {
            throw new AppError('Refresh Token does not exists');
        }

        // deleta token antigo
        await this.tokensRepository.deleteByID(userToken.id);

        // criar novo refresh_token
        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: user_id,
            expiresIn: auth.expires_in_refresh_token,
        });

        // calcular tempo de validade
        const expires_date = this.dateProvider.addDays(
            auth.expires_refresh_token_days
        );

        // salvar no db
        await this.tokensRepository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        return refresh_token;
    }
}

export { RefreshTokenUseCase };
