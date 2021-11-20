import { GetAllCarsUseCase } from './GetAllCarsUseCase';

let getAllUseCase: GetAllCarsUseCase;

describe('Get All Cars', () => {
    beforeEach(() => {
        getAllUseCase = new GetAllCarsUseCase();
    });

    it('should be able to get all available cars', async () => {
        await getAllUseCase.execute();
    });
});
