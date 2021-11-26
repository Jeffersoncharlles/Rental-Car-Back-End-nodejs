import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;

describe('', async () => {
    beforeEach(() => {
        createRentalUseCase = new CreateRentalUseCase();
    });
    it('should be able to', async () => {
        await createRentalUseCase.execute();
    });
});
