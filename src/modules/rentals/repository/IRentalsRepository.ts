import { Rentals } from '../infra/typeorm/Rentals';

interface IRentalsRepository {
    findByID(id: string): Promise<Rentals>;
    create(
        user_id: string,
        car_id: string,
        expected_return_date: Date
    ): Promise<void>;
}

export { IRentalsRepository };
