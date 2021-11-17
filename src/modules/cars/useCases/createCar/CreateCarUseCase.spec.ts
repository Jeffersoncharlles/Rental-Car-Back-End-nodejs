/** ============================================
 *!               Teste
 *=============================================* */

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;

//* Instanciando CreateCarUseCase

describe('Create car', () => {
    beforeEach(() => {
        createCarUseCase = new CreateCarUseCase();
    });

    it('should be able to create a new car', async () => {
        await createCarUseCase.execute({
            name: 'Name Car',
            description: 'Description Car',
            daily_rate: 1500,
            license_plate: 'ABC-1234',
            fine_amount: 800,
            brand: 'Brand',
            category_id: 'category',
        });
    });
});
