/* ##############################################################################
# File: CreateSpecificationUseCase                                              #
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

import { inject, injectable } from 'tsyringe';

import { ISpecificationsRepository } from '../../repository/ISpecificationsRepository';

interface IRequest {
    name: string;
    description: string;
}
@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists =
            await this.specificationsRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error('Specification already exists!');
        }

        await this.specificationsRepository.create({ name, description });
    }
}
export { CreateSpecificationUseCase };
