import { Entity, PrimaryColumn } from 'typeorm';

@Entity('rentals')
class Rentals {
    @PrimaryColumn()
    id: string;
}

export { Rentals };
