import { Router } from 'express';

import { SpecificationsRepository } from '../modules/cars/repository/SpecificationsRepository';
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryService';

const specificationRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationRoutes.post('/', (request, response) => {
    const { name, description } = request.body;
    const createSpecificationService = new CreateCategoryService(
        specificationsRepository
    );
    createSpecificationService.execute({ name, description });

    return response.status(201).send();
});

export { specificationRoutes };
