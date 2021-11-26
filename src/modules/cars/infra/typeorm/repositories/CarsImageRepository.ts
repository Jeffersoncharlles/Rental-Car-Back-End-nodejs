import { getRepository, Repository } from 'typeorm';

import { ICarsImagesRepository } from '../../../repository/ICarsImagesRepository';
import { CarImage } from '../CarImage';

class CarsImageRepository implements ICarsImagesRepository {
    private repository: Repository<CarImage>;

    constructor() {
        this.repository = getRepository(CarImage);
    }
    /*= ================= DIVISION ================= */
    /*= ================= DIVISION ================= */

    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = this.repository.create({
            car_id,
            image_name,
        });

        await this.repository.save(carImage);

        return carImage;
    }

    /*= ================= DIVISION ================= */
    /*= ================= DIVISION ================= */
    async findById(id: string): Promise<CarImage> {
        const carImage = await this.repository.findOne(id);
        return carImage;
    }

    /*= ============================================ */
    /*= ============================================ */
}

export { CarsImageRepository };
