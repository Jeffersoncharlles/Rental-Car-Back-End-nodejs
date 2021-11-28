import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '../../../dtos/ICreateRentalDTO';
import { IRentalsRepository } from '../../../repository/IRentalsRepository';
import { Rental } from '../Rental';

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }
    /*= ================= DIVISION ================= */
    /*= ================= DIVISION ================= */

    async create({
        car_id,
        user_id,
        expected_return_date,
        id,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date,
            id,
            end_date,
            total,
        });

        await this.repository.save(rental);

        return rental;
    }
    /*= ================= DIVISION ================= */
    /*= ================= DIVISION ================= */

    async findByID(id: string): Promise<Rental> {
        const findId = await this.repository.findOne({ id });

        return findId;
    }

    /*= ================= DIVISION ================= */
    /*= ================= DIVISION ================= */

    async findByOpenRentalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne({
            where: { user_id, end_date: null },
        });

        // se existe esse usuario e se eo end date for null

        return openByUser;
    }

    /*= ================= DIVISION ================= */
    /*= ================= DIVISION ================= */
    async findByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({
            where: { car_id, end_date: null },
        });

        return openByCar;
    }

    /*= ================= DIVISION ================= */
    /*= ================= DIVISION ================= */
    async findByUserId(user_id: string): Promise<Rental[]> {
        const rentals = await this.repository.find({
            user_id,
        });

        return rentals;
    }

    /*= ================= DIVISION ================= */
    /*= ================= DIVISION ================= */
}

export { RentalsRepository };
