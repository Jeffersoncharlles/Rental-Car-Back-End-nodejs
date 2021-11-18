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
    }: ICreateCarDTO): Promise<Car> {
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

        return cars;
    }

    async findByLincesPlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }
}

export { CarsRepositoryInMemory };
