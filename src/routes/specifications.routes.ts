import { Router } from 'express';

import { SpecificationsRepository } from '../modules/cars/repository/implementations/SpecificationsRepository';

const specificationRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationRoutes.post('/', (request, response) => {
    const { name, description } = request.body;

    return response.status(201).send();
});

export { specificationRoutes };
