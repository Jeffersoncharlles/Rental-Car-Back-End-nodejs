/*
[x] - Definir o tipo de retorno
[x] - Alterar o retorno de erro
[x] - Acessar o repositorio
[] - Retornar Algo 
# acessa a interface que acessa o repository
#
*/
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICategoriesRepository } from '../../repository/ICategoriesRepository';

interface IRequest {
    name: string;
    description: string;
}
@injectable()
class CreateCategoryUseCase {
    // tem que ter o private para ter acesso
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new AppError('Category Alrealy exists!');
            // e enviado para quem e responsavel para o erro
        }

        this.categoriesRepository.create({ name, description });
    }
}
export { CreateCategoryUseCase };
