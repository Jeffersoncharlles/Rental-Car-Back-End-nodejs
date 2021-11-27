import dayjs from 'dayjs';

import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { RentalsRepositoryInMemory } from '../../repository/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe('Create Rental', () => {
    const dayAdd24Hours = dayjs().add(1, 'day').toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dateProvider
        );
    });
    it('should be able to create a new rental', async () => {
        const rental = await createRentalUseCase.execute({
            user_id: '12345',
            car_id: '1212',
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });
    it('should be able to create a new rental if there is another open to  the same user', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '1212',
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '1212',
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
        // espero que seja rejeitado e contenha erro
    });
    it('should be able to create a new rental if there is another open to  the same car', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '1212',
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                user_id: '123456',
                car_id: '1212',
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
        // espero que seja rejeitado e contenha erro
    });
    it('should be able to create a new rental with invalid return time', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '1212',
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
        // espero que seja rejeitado e contenha erro
    });
});