import { Specification } from '../../infra/typeorm/Specification';
import {
    ICreatSpecificationDTO,
    ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationInMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];

    /*= ================= DIVISION ================= */
    async getAll(): Promise<Specification[]> {
        const all = this.specifications;

        return all;
    }
    /*= ================= DIVISION ================= */
    /*= ================= DIVISION ================= */
    /*= ================= DIVISION ================= */
    async create({
        description,
        name,
    }: ICreatSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            description,
            name,
        });

        this.specifications.push(specification);

        return specification;
    }

    /*= ================= DIVISION ================= */
    async findByName(name: string): Promise<Specification> {
        return this.specifications.find((s) => s.name === name);
    }

    /*= ================= DIVISION ================= */
    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter((s) =>
            ids.includes(s.id)
        );

        return allSpecifications;
    }

    /*= ================= DIVISION ================= */
}

export { SpecificationInMemory };
