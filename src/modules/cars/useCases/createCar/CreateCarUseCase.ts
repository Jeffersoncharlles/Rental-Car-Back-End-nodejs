import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { Car } from '../../infra/typeorm/Car';
import { ICarsRepository } from '../../repository/ICarsRepository';

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

// @injectable()
class CreateCarUseCase {
    constructor(
        // @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) {}

    async execute({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: IRequest): Promise<Car> {
        const carAlreadyExists = await this.carsRepository.findByLincesPlate(
            license_plate
        );

        if (carAlreadyExists) {
            throw new AppError('Car Already Exists!');
        }

        const cars = await this.carsRepository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        return cars;
    }
}

export { CreateCarUseCase };
