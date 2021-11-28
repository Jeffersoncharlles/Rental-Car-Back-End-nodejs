import { ICreateRentalDTO } from '../../dtos/ICreateRentalDTO';
import { Rental } from '../../infra/typeorm/Rental';
import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
    rentals: Rental[] = [];

    /*= ================= DIVISION ================= */
    /*= ================= DIVISION ================= */
    async create({
        car_id,
        user_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            car_id,
            expected_return_date,
            user_id,
            start_date: new Date(),
        });

        this.rentals.push(rental);

        return rental;
    }

    /*= ================= DIVISION ================= */
    /*= ================= DIVISION ================= */
    async findByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(
            (rental) => rental.car_id === car_id && !rental.end_date
        );
    }

    /*= ================= DIVISION ================= */
    /*= ================= DIVISION ================= */
    async findByOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(
            (rental) => rental.user_id === user_id && !rental.end_date
        );
    }

    /*= ================= DIVISION ================= */
    /*= ================= DIVISION ================= */

    async findByUserId(user_id: string): Promise<Rental[]> {
        return this.rentals.filter((rental) => rental.user_id === user_id);
    }

    /*= ================= DIVISION ================= */
    /*= ================= DIVISION ================= */
    async findByID(id: string): Promise<Rental> {
        return this.rentals.find((rental) => rental.id === id);
    }
}

export { RentalsRepositoryInMemory };
