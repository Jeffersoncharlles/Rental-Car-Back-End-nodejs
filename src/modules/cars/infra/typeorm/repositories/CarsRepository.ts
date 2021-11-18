import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '../../../dto/ICreateCarDTO';
import { ICarsRepository } from '../../../repository/ICarsRepository';
import { Car } from '../Car';

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const car = await this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        return car;
    }
    findByLincesPlate(license_plate: string): Promise<Car> {
        throw new Error('Method not implemented.');
    }
}
