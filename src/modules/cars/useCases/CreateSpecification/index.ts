/* ##############################################################################
# File: createCategory                                                         #
# Project: rentalbackendx                                                      #
# Created Date: 2021-09-24 04:41:00                                            #
# Author: Jefferson Charlles                                                   #
############################################################################## */

import { SpecificationsRepository } from '../../repository/implementations/SpecificationsRepository';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

const categoriesSpecification = new SpecificationsRepository();
const createSpecificationUseCase = new CreateSpecificationUseCase(
    categoriesSpecification
);
const createSpecification = new CreateSpecificationController(
    createSpecificationUseCase
);

export { createSpecification };
