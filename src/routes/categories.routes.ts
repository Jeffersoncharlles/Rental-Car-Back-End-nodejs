import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { GetAllCategoryController } from '../modules/cars/useCases/getAllCategory/GetAllCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController';

const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp',
});
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const getAllCategoryController = new GetAllCategoryController();

/*= ================================================================================== */
/*= ================================================================================== */
categoriesRoutes.post('/', createCategoryController.handle);
/*= ================================================================================== */
categoriesRoutes.get('/', getAllCategoryController.handle);
/*= ================================================================================== */
categoriesRoutes.post(
    '/import',
    upload.single('file'),
    importCategoryController.handle
);
/*= ================================================================================== */

export { categoriesRoutes };
