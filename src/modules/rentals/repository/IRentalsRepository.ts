import { Rentals } from '../infra/typeorm/Rentals';

interface IRentalsRepository {
    findByID(id: string): Promise<Rentals>;
}

export { IRentalsRepository };
