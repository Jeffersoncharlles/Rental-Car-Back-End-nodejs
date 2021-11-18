import { ICreateCarDTO } from '../dto/ICreateCarDTO';
import { Car } from '../infra/typeorm/Car';

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLincesPlate(license_plate: string): Promise<Car>;
}

export { ICarsRepository };
