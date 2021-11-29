import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

class RefreshTokenController {
    async handle(req: Request, res: Response): Promise<Response> {
        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
    }
}

export { RefreshTokenController };
