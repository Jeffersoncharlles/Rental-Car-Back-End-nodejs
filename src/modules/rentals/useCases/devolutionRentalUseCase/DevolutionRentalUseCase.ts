import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { ICarsRepository } from '../../../cars/repository/ICarsRepository';
import { Rental } from '../../infra/typeorm/Rental';
import { IRentalsRepository } from '../../repository/IRentalsRepository';

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider
    ) {}

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const minimumDaily = 1;
        const car = await this.carsRepository.findById(id);
        const rental = await this.rentalsRepository.findByID(id);
        if (!rental) {
            throw new AppError('Rental this not Exists!');
        }

        // verificar a diarias quantas diarias tem esse aluguel
        let dailyCompare = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.dateNow()
        );
        if (dailyCompare <= 0) {
            dailyCompare = minimumDaily;
        }

        // verificar se tem multa de atraso
        const delayCompare = this.dateProvider.compareInDays(
            this.dateProvider.dateNow(),
            rental.expected_return_date
        );

        // verificar quanto tem total de multas
        let total = 0;
        if (delayCompare > 0) {
            const calculateFine = delayCompare * car.fine_amount;
            // se tiver multa multiplica os dias de multa por quantidade de multas anterior
            total = calculateFine;
        }

        // total = total + daily * car.daily_rate
        total += dailyCompare * car.daily_rate;
        // total ate aqui e igual + dias alugados + diarias

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;
        // o dia final e agora
        // e to passando para o valor total que esta agora depois de multas e dias

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);
        // true para dizer que ta liberado partir de agora

        return rental;
    }
}

export { DevolutionRentalUseCase };
