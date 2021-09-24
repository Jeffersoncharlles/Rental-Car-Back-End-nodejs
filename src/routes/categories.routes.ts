import { Router } from 'express';

import { CategoriesRepository } from '../repository/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategory.Service';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();
/*= ================================================================================== */
/*= ================================================================================== */
categoriesRoutes.post('/', (request, response) => {
    const { name, description } = request.body;
    const createCategoryService = new CreateCategoryService(
        categoriesRepository
    );
    createCategoryService.execute({ name, description });
    return response.status(201).send();
});
/*= ================================================================================== */
/*= ================================================================================== */
categoriesRoutes.get('/', (request, response) => {
    const all = categoriesRepository.getAll();

    return response.json(all);
});
/*= ================================================================================== */
/*= ================================================================================== */

export { categoriesRoutes };
