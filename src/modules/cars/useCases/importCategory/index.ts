import { CategoriesRepository } from '../../repository/implementations/CategoriesRepository';
import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

export default (): ImportCategoryController => {
    const categoriesRepository = new CategoriesRepository();
    const importCategoryUseCase = new ImportCategoryUseCase(
        categoriesRepository
    );
    const importCategory = new ImportCategoryController(importCategoryUseCase);
    return importCategory;
};
