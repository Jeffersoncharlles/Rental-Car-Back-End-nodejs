import { RentalsRepositoryInMemory } from '../../repository/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory
        );
    });
    it('should be able to', async () => {
        await createRentalUseCase.execute({
            user_id: '12345',
            car_id: '1212',
            expected_return_date: new Date(),
        });
    });
});
