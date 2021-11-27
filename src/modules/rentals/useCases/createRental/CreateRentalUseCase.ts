import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { Rental } from '../../infra/typeorm/Rental';
import { IRentalsRepository } from '../../repository/IRentalsRepository';

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalRepository: IRentalsRepository,

        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider
    ) {}
    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const compareHours = 23;
        const carUnavailable = await this.rentalRepository.findByCar(car_id);

        if (carUnavailable) {
            throw new AppError('Car is unavailable');
        }

        const rentalOpenToUser =
            await this.rentalRepository.findByOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user!");
        }

        // o aluguel deve ter 24 horas minima
        const dateNow = this.dateProvider.dateNow();
        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date
        );
        // ok Format date

        if (compare < compareHours) {
            throw new AppError('Invalid return time!');
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
