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
    it('should be able to add a new specification to the car', async () => {});
});
