import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetAvailableCarsUseCase } from './GetAvailableCarsUseCase';

class GetAvailableCarsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { brand, name, category_id } = req.query;

        const listAvailableCarsUseCase = container.resolve(
            GetAvailableCarsUseCase
        );

        const cars = await listAvailableCarsUseCase.execute({
            brand: brand as string,
            name: name as string,
            category_id: category_id as string,
        });
        // forcando reconhecer string

        return res.json(cars);
    }
}

export { GetAvailableCarsController };
