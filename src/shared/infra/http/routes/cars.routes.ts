import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { GetAvailableCarsController } from '../../../../modules/cars/useCases/GetAvailableCars/GetAvailableCarsController';
import { UploadCarImageController } from '../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const getAvailableCarsController = new GetAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

const upload = multer(uploadConfig);

/*= ================================================================================== */
/*= ================================================================================== */
carsRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);
// ele verifica se ele esta autenticado e se ele e admin
/*= ================================================================================== */
carsRoutes.get('/available', getAvailableCarsController.handle);
/*= ================================================================================== */
carsRoutes.post(
    '/specifications/:id',
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
);
/*= ================================================================================== */
carsRoutes.post(
    '/images/:id',
    ensureAuthenticated,
    ensureAdmin,
    upload.array('images'),
    uploadCarImageController.handle
);
/*= ================================================================================== */

export { carsRoutes };
