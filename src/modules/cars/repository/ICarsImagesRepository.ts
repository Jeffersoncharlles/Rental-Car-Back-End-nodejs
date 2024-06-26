import { CarImage } from '../infra/typeorm/CarImage';

interface ICarsImagesRepository {
    create(car_id: string, image_name: string): Promise<CarImage>;
    findById(id: string): Promise<CarImage>;
}

export { ICarsImagesRepository };
