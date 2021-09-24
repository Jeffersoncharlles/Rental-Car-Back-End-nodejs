import { Router } from 'express';

import { createCategory } from '../modules/cars/useCases/createCategory';
import { getAllCategory } from '../modules/cars/useCases/getAllCategory';

const categoriesRoutes = Router();

/*= ================================================================================== */
/*= ================================================================================== */
categoriesRoutes.post('/', (request, response) => {
    return createCategory.handle(request, response);
});
/*= ================================================================================== */
categoriesRoutes.get('/', (request, response) => {
    return getAllCategory.handle(request, response);
});
/*= ================================================================================== */

export { categoriesRoutes };
