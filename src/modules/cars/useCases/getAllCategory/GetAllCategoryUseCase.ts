/*
[x] - Definir o tipo de retorno
[x] - Alterar o retorno de erro
[x] - Acessar o repositorio
[] - Retornar Algo 
# acessa a interface que acessa o repository
#
*/

import { inject, injectable } from 'tsyringe';

import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repository/ICategoriesRepository';

@injectable()
class GetAllCategoryUseCase {
    // tem que ter o private para ter acesso
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.getAll();

        return categories;
    }
}
export { GetAllCategoryUseCase };
