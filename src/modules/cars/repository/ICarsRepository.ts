/**
 * @Author: Jefferson Charlles
 * @Date:   2021-11-17 19:40:09
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 18:09:14
 */
import { ICreateCarDTO } from '../dto/ICreateCarDTO';
import { Car } from '../infra/typeorm/Car';

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLincesPlate(license_plate: string): Promise<Car>;
    findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]>;
    findById(id: string): Promise<Car>;
    updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
