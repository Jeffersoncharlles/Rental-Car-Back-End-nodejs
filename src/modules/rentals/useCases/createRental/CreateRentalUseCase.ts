import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { Rental } from '../../infra/typeorm/Rental';
import { IRentalsRepository } from '../../repository/IRentalsRepository';

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

// @injectable()
class CreateRentalUseCase {
    constructor(
        // @inject("RentalsRepository")
        private rentalRepository: IRentalsRepository
    ) {}
    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const carUnavailable = await this.rentalRepository.findByCar(car_id);

        if (carUnavailable) {
            throw new AppError('Car is unavailable');
        }

        const rentalOpenToUser =
            await this.rentalRepository.findByOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user!");
        }

        const rental = await this.rentalRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase };
