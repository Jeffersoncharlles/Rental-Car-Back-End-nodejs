import { ICreateCarDTO } from '../../dto/ICreateCarDTO';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
    create(data: ICreateCarDTO): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

export { CarsRepositoryInMemory };
