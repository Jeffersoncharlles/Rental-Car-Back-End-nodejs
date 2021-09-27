import { Router } from 'express';

import { createSpecification } from '../modules/cars/useCases/CreateSpecification';

const specificationRoutes = Router();

specificationRoutes.post('/', (request, response) => {
    return createSpecification.handle(request, response);
});

export { specificationRoutes };
