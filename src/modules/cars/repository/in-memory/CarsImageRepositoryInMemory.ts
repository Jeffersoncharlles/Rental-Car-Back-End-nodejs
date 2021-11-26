/** ============================================
 *               CAR IMAGES IN-MEMORY
 *=============================================* */

import { CarImage } from '../../infra/typeorm/CarImage';
import { ICarsImagesRepository } from '../ICarsImagesRepository';

class CarsImageRepositoryInMemory implements ICarsImagesRepository {
    carImage: CarImage[] = [];

    /*= ========================================================================== */
    /*= ================================ CREATE ================================== */
    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImages = new CarImage();

        Object.assign(carImages, {
            car_id,
            image_name,
        });

        this.carImage.push(carImages);

        return carImages;
    }
    /*= ========================================================================== */
    /*= =============================== FIND-BY-ID =============================== */
    async findById(id: string): Promise<CarImage> {
        return this.carImage.find((img) => img.id === id);
    }
    /*= ========================================================================== */
}

export { CarsImageRepositoryInMemory };
