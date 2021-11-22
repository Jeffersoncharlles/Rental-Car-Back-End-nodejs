/** ================================================================================================
 *                                        WARNING HEADER
 * listar todos os carros
 *================================================================================================* */

import { inject, injectable } from 'tsyringe';

import { Car } from '../../infra/typeorm/Car';
import { ICarsRepository } from '../../repository/ICarsRepository';

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
class GetAvailableCarsUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) {}
    async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable(
            brand,
            category_id,
            name
        );
        return cars;
    }
}

export { GetAvailableCarsUseCase };
