/*
[x] - Definir o tipo de retorno
[x] - Alterar o retorno de erro
[x] - Acessar o repositorio
[] - Retornar Algo 
# acessa a interface que acessa o repository
#
*/

import { Category } from '../../model/Category';
import { ICategoriesRepository } from '../../repository/ICategoriesRepository';

class GetAllCategoryUseCase {
    // tem que ter o private para ter acesso
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute(): Category[] {
        const categories = this.categoriesRepository.getAll();

        return categories;
    }
}
export { GetAllCategoryUseCase };
