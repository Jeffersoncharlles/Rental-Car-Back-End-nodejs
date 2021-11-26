import { Rental } from '../infra/typeorm/Rental';

interface IRentalsRepository {
    findByID(id: string): Promise<Rental>;
    create(
        user_id: string,
        car_id: string,
        expected_return_date: Date
    ): Promise<void>;

    findByCar(car_id: string): Promise<Rental>;
    findByOpenRentalByUser(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
