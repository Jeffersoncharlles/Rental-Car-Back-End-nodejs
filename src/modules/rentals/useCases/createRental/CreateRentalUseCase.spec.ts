import dayjs from 'dayjs';

import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../../cars/repository/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '../../repository/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryImemore: CarsRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe('Create Rental', () => {
    const dayAdd24Hours = dayjs().add(1, 'day').toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        carsRepositoryImemore = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dateProvider,
            carsRepositoryImemore
        );
    });
    it('should be able to create a new rental', async () => {
        const car = await carsRepositoryImemore.create({
            name: 'Test',
            description: 'Car Test',
            daily_rate: 100,
            license_plate: 'test',
            fine_amount: 40,
            category_id: '1234',
            brand: 'brand',
        });

        const rental = await createRentalUseCase.execute({
            user_id: '12345',
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });
    it('should be able to create a new rental if there is another open to  the same user', async () => {
        await rentalsRepositoryInMemory.create({
            car_id: 'xxxx',
            expected_return_date: dayAdd24Hours,
            user_id: '12345',
        });
        await expect(
            createRentalUseCase.execute({
                user_id: '12345',
                car_id: '1212',
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(
            new AppError("There's a rental in progress for user!")
        );
        // espero que seja rejeitado e contenha erro
    });
    it('should be able to create a new rental if there is another open to  the same car', async () => {
        await rentalsRepositoryInMemory.create({
            car_id: 'xxTest',
            expected_return_date: dayAdd24Hours,
            user_id: '12345',
        });
        await expect(
            createRentalUseCase.execute({
                user_id: '123456',
                car_id: 'xxTest',
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError('Car is unavailable'));
        // espero que seja rejeitado e contenha erro
    });
    it('should be able to create a new rental with invalid return time', async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: '12345',
                car_id: '1212',
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError('Invalid return time!'));
        // espero que seja rejeitado e contenha erro
    });
});
