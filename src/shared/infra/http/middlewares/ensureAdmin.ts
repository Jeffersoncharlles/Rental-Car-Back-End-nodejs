import { Response, Request, NextFunction } from 'express';

import { UsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '../../../errors/AppError';

const ensureAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    // verificar se ele e admin
    if (!user.isAdmin) {
        throw new AppError("User isn't admin!");
    }

    return next();
};

export { ensureAdmin };
