import { CarImage } from '../../infra/typeorm/CarImage';
import { ICarsImagesRepository } from '../ICarsImagesRepository';

class CarsImageRepositoryInMemory implements ICarsImagesRepository {
    carImage: CarImage[] = [];

    async create(car_id: string, image_name: string): Promise<CarImage> {
        throw new Error('Method not implemented.');
    }
    async findById(id: string): Promise<CarImage> {
        return this.carImage.find((img) => img.id === id);
    }
}

export { CarsImageRepositoryInMemory };
