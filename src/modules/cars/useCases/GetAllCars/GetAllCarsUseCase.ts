/** ================================================================================================
 *                                        WARNING HEADER
 * listar todos os carros
 *================================================================================================* */

import { Car } from '../../infra/typeorm/Car';
import { ICarsRepository } from '../../repository/ICarsRepository';

class GetAllCarsUseCase {
    constructor(private carsRepository: ICarsRepository) {}
    async execute(): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable();
        return cars;
    }
}

export { GetAllCarsUseCase };
