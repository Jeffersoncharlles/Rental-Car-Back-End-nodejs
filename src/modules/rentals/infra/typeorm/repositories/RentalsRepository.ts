import { IRentalsRepository } from '../../../repository/IRentalsRepository';
import { Rentals } from '../Rentals';

class RentalsRepository implements IRentalsRepository {
    async findByID(id: string): Promise<Rentals> {
        throw new Error('Method not implemented.');
    }
}

export { RentalsRepository };
