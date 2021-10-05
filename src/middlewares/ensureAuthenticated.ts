import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
    sub: string;
}

const ensureAuthenticated = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    // padrao jwt Bearer espaco token passado

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('token missing');
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
        const { sub: user_id } = verify(
            token,
            'c2bce9f305189813992b8ec41217b4bb'
        ) as IPayload;

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new Error('User does not exists!');
        }

        next();
    } catch (error) {
        throw new Error('Invalid token!');
    }
};

export { ensureAuthenticated };
