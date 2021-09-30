import { Response, Request } from 'express';

import { GetAllCategoryUseCase } from './GetAllCategoryUseCase';

class GetAllCategoryController {
    constructor(private getAllCategoryUseCase: GetAllCategoryUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const all = await this.getAllCategoryUseCase.execute();
        return response.json(all);
    }
}

export { GetAllCategoryController };
