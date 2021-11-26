import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '../../../dto/ICreateCarDTO';
import { ICarsRepository } from '../../../repository/ICarsRepository';
import { Car } from '../Car';

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    /*= ================= DIVISION ================= */
    /*= ================= create ================= */
    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications,
            id,
        });

        await this.repository.save(car);

        return car;
    }
    /*= ================= DIVISION ================= */
    /*= ================= findByLincesPlate ================= */
    async findByLincesPlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            license_plate,
        });

        return car;
    }
    /*= ================= DIVISION ================= */
    /*= ================= findAvailable ================= */

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder('cars')
            .where('available = :available', { available: true });

        if (brand) {
            carsQuery.andWhere('brand = :brand', { brand });
        }
        if (name) {
            carsQuery.andWhere('name = :name', { name });
        }
        if (category_id) {
            carsQuery.andWhere('category_id = :category_id', {
                category_id,
            });
        }

        const cars = await carsQuery.getMany();

        return cars;
        // getMany e para retornar todos os resultados
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);
        return car;
    }
}

export { CarsRepository };
