import {
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Category } from './Category';
import { Specification } from './Specification';

@Entity('cars')
class Car {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    available: boolean;
    // assim ele vai atribuir o valor como true e colocar como boolean

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @ManyToOne(() => Category) // muitos carros para uma categoria
    @JoinColumn({ name: 'category_id' })
    category: Category;
    // referenciar para ter o acesso ao objeto categoria

    @Column()
    category_id: string;

    // muitos para muitos

    @ManyToMany(() => Specification)
    // join table para referenciar a table
    @JoinTable({
        name: 'specifications_cars', // nome da table de relacionamento
        joinColumns: [{ name: 'car_id' }], // qual e a coluna que pertence a table de carro
        inverseJoinColumns: [{ name: 'specification_id' }], // a que esta no many to many
    })
    specifications: Specification[];
    // referenciando o objeto Specification

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.available = true;
            // this.created_at = new Date();
        }
    }
}

export { Car };
