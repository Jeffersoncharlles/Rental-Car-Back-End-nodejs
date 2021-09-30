import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import getAllCategory from '../modules/cars/useCases/getAllCategory';
import importCategory from '../modules/cars/useCases/importCategory';

const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp',
});
const createCategoryController = new CreateCategoryController();

/*= ================================================================================== */
/*= ================================================================================== */
categoriesRoutes.post('/', createCategoryController.handle);
/*= ================================================================================== */
categoriesRoutes.get('/', (request, response) => {
    return getAllCategory().handle(request, response);
});
/*= ================================================================================== */
categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
    return importCategory().handle(request, response);
});
/*= ================================================================================== */

export { categoriesRoutes };
