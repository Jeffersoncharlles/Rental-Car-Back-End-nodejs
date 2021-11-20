import { CarsRepositoryInMemory } from '../../repository/in-memory/CarsRepositoryInMemory';
import { GetAllCarsUseCase } from './GetAllCarsUseCase';

let getAllUseCase: GetAllCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Get All Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        getAllUseCase = new GetAllCarsUseCase(carsRepositoryInMemory);
    });

    it('should be able to get all available cars', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'New Car',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-xxxx',
            fine_amount: 800,
            brand: 'Brands',
            category_id: '256f27ca-817f-4c4d-9570-ba2c1652176f',
        });

        const cars = await getAllUseCase.execute({});

        expect(cars).toEqual([car]);
        // espero que o cars seja igual o array com o carro
    });

    it('should be able to get all available cars by name', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'New Car',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-xxxx',
            fine_amount: 800,
            brand: 'Car_brand',
            category_id: '256f27ca-817f-4c4d-9570-ba2c1652176f',
        });

        const cars = await getAllUseCase.execute({
            brand: 'Car_brand',
        });

        console.log(cars);

        expect(cars).toEqual([car]);
    });
});
