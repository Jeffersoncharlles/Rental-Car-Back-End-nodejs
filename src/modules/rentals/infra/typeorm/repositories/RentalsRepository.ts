import { IRentalsRepository } from '../../../repository/IRentalsRepository';
import { Rental } from '../Rental';

class RentalsRepository implements IRentalsRepository {
    async create(
        user_id: string,
        car_id: string,
        expected_return_date: Date
    ): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async findByCar(car_id: string): Promise<Rental> {
        throw new Error('Method not implemented.');
    }
    async findByID(id: string): Promise<Rental> {
        throw new Error('Method not implemented.');
    }

    async findByOpenRentalByUser(user_id: string): Promise<Rental> {
        throw new Error('Method not implemented.');
    }
}

export { RentalsRepository };
