import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '../../../../config/auth';
import { UsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '../../../errors/AppError';

interface IPayload {
    sub: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ensureAuthenticated = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    // padrao jwt Bearer espaco token passado

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('token missing', 401);
        // se nao tiver nada ja manda vazar
    }

    /**
     *
     *  vai dividir o array por espaco com split
     *  [0] posicao 0 ele vai vim o bearer
     *  [1] posicao 1 ele vai vim o token
     *  posicao 0 ignora e na posicao 1 coloca
     *  na variaveis token
     *
     *
     *
     * */
    const [, token] = authHeader.split(' ');
    //

    try {
        const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User does not exists!', 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch (error) {
        throw new AppError('Invalid token!', 401);
    }
};

export { ensureAuthenticated };
