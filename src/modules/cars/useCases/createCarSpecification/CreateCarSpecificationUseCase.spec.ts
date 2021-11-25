import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repository/in-memory/CarsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create Car Specification', () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepository
        );
    });
    it('should not be able to add a new specification to a now-existent car', async () => {
        expect(async () => {
            const car_id = '123';

            const specifications_id = ['23123', '23123123'];

            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
    it('should be able to add a new specification to the car', async () => {
        const car = await carsRepository.create({
            name: 'Name Car',
            description: 'Description Car',
            daily_rate: 1500,
            license_plate: 'ABC-1234',
            fine_amount: 800,
            brand: 'Brand',
            category_id: 'category',
        });

        const specifications_id = ['23123', '23123123'];

        await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });
    });
});
