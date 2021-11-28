import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/Rental';

interface IRentalsRepository {
    findByID(id: string): Promise<Rental>;
    create(data: ICreateRentalDTO): Promise<Rental>;

    findByCar(car_id: string): Promise<Rental>;
    findByOpenRentalByUser(user_id: string): Promise<Rental>;
    findByUserId(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository };
