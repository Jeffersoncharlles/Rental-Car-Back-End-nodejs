/**
 * @Author: Jefferson Charlles
 * @Date:   2021-11-30 12:51:13
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 01:30:21
 */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

class SendForgotPasswordMailController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;

        const sendForgotPasswordMailUseCase = container.resolve(
            SendForgotPasswordMailUseCase
        );

        sendForgotPasswordMailUseCase.execute(email);

        return res.send();
    }
}

export { SendForgotPasswordMailController };
