/* ##############################################################################
# File: getAllCategory                                                         #
# Project: rentalbackendx                                                      #
# Created Date: 2021-09-24 04:41:00                                            #
# Author: Jefferson Charlles                                                   #
############################################################################## */

import { CategoriesRepository } from '../../repository/CategoriesRepository';
import { GetAllCategoryController } from './GetAllCategoryController';
import { GetAllCategoryUseCase } from './GetAllCategoryUseCase';

// nao vou criar mais a new aqui vou so chamar
const categoriesRepository = CategoriesRepository.getInstance();
const getAllCategoryUseCase = new GetAllCategoryUseCase(categoriesRepository);
const getAllCategory = new GetAllCategoryController(getAllCategoryUseCase);

export { getAllCategory };
