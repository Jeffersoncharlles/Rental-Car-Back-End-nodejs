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
        const cars = await getAllUseCase.execute();
        console.log(cars);
    });
});
