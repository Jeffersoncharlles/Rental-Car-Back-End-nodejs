import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { GetAllCategoryUseCase } from './GetAllCategoryUseCase';

class GetAllCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const getAllCategoryUseCase = container.resolve(GetAllCategoryUseCase);
        const all = await getAllCategoryUseCase.execute();
        return response.json(all);
    }
}

export { GetAllCategoryController };
