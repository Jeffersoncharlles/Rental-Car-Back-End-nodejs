import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '../../repository/ICarsImagesRepository';

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImageUseCase {
    constructor(
        @inject('CarsImagesRepository')
        private carsImagesRepository: ICarsImagesRepository
    ) {}

    async execute({ car_id, images_name }: IRequest): Promise<void> {
        images_name.map(async (img) => {
            await this.carsImagesRepository.create(car_id, img);
        });
    }
}

export { UploadCarImageUseCase };
