import { Specification } from '../model/Specification';
import {
    ICreatSpecificationDTO,
    ISpecificationsRepository,
} from './ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }

    create({ name, description }: ICreatSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });

        // throw new Error('Method not implemented.');
        this.specifications.push(specification);
    }

    findByName(name: string): Specification {
        const specification = this.specifications.find((s) => s.name === name);

        return specification;
    }
}

export { SpecificationsRepository };
