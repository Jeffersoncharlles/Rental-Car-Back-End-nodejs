/* eslint-disable import/no-unresolved */
import { ICreateCarDTO } from '../../dto/ICreateCarDTO';
import { Car } from '../../infra/typeorm/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const cars = new Car();

        Object.assign(cars, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        this.cars.push(cars);

        return cars;
    }

    async findByLincesPlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const cars = this.cars.filter((car) => {
            if (
                car.available === true ||
                (brand && car.brand === brand) ||
                (category_id && car.category_id === category_id) ||
                (name && car.name === name)
            ) {
                return car;
            }
            return null;
            /** =======================
             *  car.available === true
             * condicao obrigatoria e os outros nao
             * pois ta usando o operator eee e nao o ou
             *========================* */
        });

        // const cars = this.cars
        //     .filter((car) => car.available === true)
        //     .filter(
        //         (car) =>
        //             (brand && car.brand === brand) ||
        //             (category_id && car.category_id === category_id) ||
        //             (name && car.name === name)
        //     );
        /** =======================
         *  (car) => car.available === true
         * aqui ele verifica se o carro ta available
         *
         * (brand && car.brand === brand)
         * se o brand ta preenchido
         * e o car.brand for igual a brand
         *
         *========================* */

        return cars;
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id);
    }
}

export { CarsRepositoryInMemory };
