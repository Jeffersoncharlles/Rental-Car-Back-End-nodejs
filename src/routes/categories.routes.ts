import { Router } from 'express';
import multer from 'multer';

import { createCategory } from '../modules/cars/useCases/createCategory';
import { getAllCategory } from '../modules/cars/useCases/getAllCategory';
import { importCategory } from '../modules/cars/useCases/importCategory';

const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp',
});

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
categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
    return importCategory.handle(request, response);
});
/*= ================================================================================== */

export { categoriesRoutes };
