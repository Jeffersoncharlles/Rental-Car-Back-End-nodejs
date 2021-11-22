import { Router } from 'express';

import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';
import { GetAvailableCarsController } from '../../../../modules/cars/useCases/GetAvailableCars/GetAvailableCarsController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const getAvailableCarsController = new GetAvailableCarsController();

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

/*= ================================================================================== */

export { carsRoutes };
