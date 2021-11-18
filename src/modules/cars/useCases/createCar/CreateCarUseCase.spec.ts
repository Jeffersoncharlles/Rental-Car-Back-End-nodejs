/** ============================================
 *!               Teste
 *=============================================* */

import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repository/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

//* Instanciando CreateCarUseCase

describe('Create car', () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    });

    it('should be able to create a new car', async () => {
        const car = await createCarUseCase.execute({
            name: 'Name Car',
            description: 'Description Car',
            daily_rate: 1500,
            license_plate: 'ABC-1234',
            fine_amount: 800,
            brand: 'Brand',
            category_id: 'category',
        });

        expect(car).toHaveProperty('id');
    });
    /** =======================
     * e possivel criar um carro
     * espero que no carro tenha a propriedade id
     *========================* */

    it('should not be able to create a car with exists license plate', () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: 'Car1',
                description: 'Description Car',
                daily_rate: 1500,
                license_plate: 'ABC-1234',
                fine_amount: 800,
                brand: 'Brand',
                category_id: 'category',
            });

            await createCarUseCase.execute({
                name: 'Car2',
                description: 'Description Car',
                daily_rate: 1500,
                license_plate: 'ABC-1234',
                fine_amount: 800,
                brand: 'Brand',
                category_id: 'category',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
    /** =======================
     * Nao pode criar um carro com mesma placa
     *========================* */

    it('should not be able to create a car with available true by default', async () => {
        const car = await createCarUseCase.execute({
            name: 'Car2',
            description: 'Description Car',
            daily_rate: 1500,
            license_plate: 'ABCD-1234',
            fine_amount: 800,
            brand: 'Brand',
            category_id: 'category',
        });

        expect(car.available).toBe(true);
    });
    /** =======================
     * Espero que a disponibilidade seja true por default
     *========================* */
});
