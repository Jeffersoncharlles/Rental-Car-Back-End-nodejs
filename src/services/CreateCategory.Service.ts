/*
[x] - Definir o tipo de retorno
[x] - Alterar o retorno de erro
[x] - Acessar o repositorio
[] - Retornar Algo 
# o service acessa o repository que acessa o model 
#
*/
import { CategoriesRepository } from '../repository/CategoriesRepository';

interface IRequest {
    name: string;
    description: string;
}
class CreateCategoryService {
    // tem que ter o private para ter acesso
    constructor(private categoriesRepository: CategoriesRepository) {}

    execute({ name, description }: IRequest): void {
        const categoryAlreadyExists =
            this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error('Category Alrealy exists!');
            // e enviado para quem e responsavel para o erro
        }

        this.categoriesRepository.create({ name, description });
    }
}
export { CreateCategoryService };
