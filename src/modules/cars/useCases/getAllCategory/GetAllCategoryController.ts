import { Response, Request } from 'express';

import { GetAllCategoryUseCase } from './GetAllCategoryUseCase';

class GetAllCategoryController {
    constructor(private getAllCategoryUseCase: GetAllCategoryUseCase) {}

    handle(request: Request, response: Response): Response {
        const all = this.getAllCategoryUseCase.execute();
        return response.json(all);
    }
}

export { GetAllCategoryController };
