/* eslint-disable import/no-unresolved */
import { ICreateCarDTO } from '../../dto/ICreateCarDTO';
import { Car } from '../../infra/typeorm/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<void> {
        const cars = new Car();

        Object.assign(cars, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        this.cars.push(cars);
    }
}

export { CarsRepositoryInMemory };
