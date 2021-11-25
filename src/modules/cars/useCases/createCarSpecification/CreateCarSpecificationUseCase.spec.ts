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
    // it('should be able to add a new specification to the car', async () => {
    //     const car_id = '123';

    //     const specifications_id = ['23123', '23123123'];

    //     await createCarSpecificationUseCase.execute({
    //         car_id,
    //         specifications_id,
    //     });
    // });
});
