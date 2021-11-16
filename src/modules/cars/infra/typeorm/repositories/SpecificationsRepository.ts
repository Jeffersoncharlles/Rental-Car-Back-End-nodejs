import { getRepository, Repository } from 'typeorm';

import {
    ICreatSpecificationDTO,
    ISpecificationsRepository,
} from '../../../repository/ISpecificationsRepository';
import { Specification } from '../Specification';

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }
    /*= ================================================================================== */
    /*= =================================CREATE============================================ */
    async create({ name, description }: ICreatSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            name,
            description,
        });
        await this.repository.save(specification);
    }
    /*= ================================================================================== */
    /*= ==============================FIND-BY-NAME============================================ */
    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });

        return specification;
    }
    /*= ================================================================================== */
    /*= =================================GET-ALL============================================ */
    async getAll(): Promise<Specification[]> {
        const getAll = await this.repository.find();
        return getAll;
    }
    /*= ================================================================================== */
    /*= =================================GET-ALL============================================ */
}

export { SpecificationsRepository };
