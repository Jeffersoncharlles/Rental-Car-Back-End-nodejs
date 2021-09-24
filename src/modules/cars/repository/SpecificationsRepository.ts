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
    /*= ================================================================================== */
    /*= =================================CREATE============================================ */
    create({ name, description }: ICreatSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });

        this.specifications.push(specification);
    }
    /*= ================================================================================== */
    /*= ==============================FIND-BY-NAME============================================ */
    findByName(name: string): Specification {
        const specification = this.specifications.find((s) => s.name === name);

        return specification;
    }
    /*= ================================================================================== */
    /*= =================================GET-ALL============================================ */
    getAll(): Specification[] {
        return this.specifications;
    }
    /*= ================================================================================== */
    /*= =================================GET-ALL============================================ */
}

export { SpecificationsRepository };
