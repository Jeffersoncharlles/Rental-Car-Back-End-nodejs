import { Router } from 'express';

import { CreateSpecificationController } from '../../../../modules/cars/useCases/CreateSpecification/CreateSpecificationController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

/*= ================================================================================== */
/*= ================================================================================== */
specificationRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationController.handle
);
/*= ================================================================================== */

export { specificationRoutes };
