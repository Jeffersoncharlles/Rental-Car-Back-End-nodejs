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
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        await this.repository.save(car);

        return car;
    }
    async findByLincesPlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            license_plate,
        });

        return car;
    }
}

export { CarsRepository };
