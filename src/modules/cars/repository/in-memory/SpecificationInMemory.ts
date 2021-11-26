import { Specification } from '../../infra/typeorm/Specification';
import {
    ICreatSpecificationDTO,
    ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationInMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];

    async getAll(): Promise<Specification[]> {
        const all = this.specifications;

        return all;
    }
    async create({
        name,
        description,
    }: ICreatSpecificationDTO): Promise<Specification> {
        const specification = new Specification();
        Object.assign(specification, {
            description,
            name,
        });
        this.specifications.push();

        return specification;
    }
    async findByName(name: string): Promise<Specification> {
        return this.specifications.find((s) => s.name === name);
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter((s) =>
            ids.includes(s.id)
        );

        return allSpecifications;
    }
}

export { SpecificationInMemory };
