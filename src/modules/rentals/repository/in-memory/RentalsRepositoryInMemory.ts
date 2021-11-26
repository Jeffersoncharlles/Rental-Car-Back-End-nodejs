import { Rental } from '../../infra/typeorm/Rental';
import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
    rentals: Rental[] = [];
    async findByID(id: string): Promise<Rental> {
        throw new Error('Method not implemented.');
    }
    async create(
        user_id: string,
        car_id: string,
        expected_return_date: Date
    ): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async findByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(
            (rental) => rental.car_id === car_id && rental.end_date === null
        );
    }
    async findByOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(
            (rental) => rental.user_id === user_id && rental.end_date === null
        );
    }
}

export { RentalsRepositoryInMemory };
