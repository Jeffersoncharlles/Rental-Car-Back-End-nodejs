import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repository/in-memory/CarsRepositoryInMemory';
import { SpecificationInMemory } from '../../repository/in-memory/SpecificationInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: CarsRepositoryInMemory;
let specificationsRepository: SpecificationInMemory;

describe('Create Car Specification', () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        specificationsRepository = new SpecificationInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepository,
            specificationsRepository
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

        const specificationCreate = await specificationsRepository.create({
            description: 'test',
            name: 'test',
        });

        const specifications_id = [specificationCreate.id];

        const specificationCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        // espero que tenha a propriedade specifications
        expect(specificationCars).toHaveProperty('specifications');
        expect(specificationCars.specifications.length).toBe(1);
        // espero que o tamanho seja de 1
    });
});
