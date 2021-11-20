import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { GetAllCategoryController } from '../../../../modules/cars/useCases/getAllCategory/GetAllCategoryController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/ImportCategoryController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp',
});
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const getAllCategoryController = new GetAllCategoryController();

/*= ================================================================================== */
/*= ================================================================================== */
categoriesRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle
);
// para criar um novo carro precisa estar autenticado e tambem ser admin

/*= ================================================================================== */
categoriesRoutes.get('/', getAllCategoryController.handle);
/*= ================================================================================== */
categoriesRoutes.post(
    '/import',
    ensureAuthenticated,
    ensureAdmin,
    upload.single('file'),
    importCategoryController.handle
);
/*= ================================================================================== */

export { categoriesRoutes };
