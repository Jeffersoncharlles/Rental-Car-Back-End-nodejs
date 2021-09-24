/* ##############################################################################
# File: CreateSpecificationService.ts                                          #
# Project: rentalbackendx                                                      #
# Created Date: 2021-09-24 01:41:00                                            #
# Author: Jefferson Charlles                                                   #
############################################################################## */

/*
[x] - Definir o tipo de retorno
[x] - Alterar o retorno de erro
[x] - Acessar o repositorio
[] - Retornar Algo 
# acessa a interface que acessa o repository
# a arquitetura limpa nao deve conhecer o db
# sempre conhecer a interface e nunca a implementacao
*/

import { ISpecificationsRepository } from '../repository/ISpecificationsRepository';

interface IRequest {
    name: string;
    description: string;
}
class CreateSpecificationService {
    // tem que ter o private para ter acesso
    constructor(private categoriesRepository: ISpecificationsRepository) {}

    execute({ name, description }: IRequest): void {
        console.log('TODO');
    }
}
export { CreateSpecificationService };
