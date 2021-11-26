/*
interface contrato 
*/

import { Specification } from '../infra/typeorm/Specification';

// DTO -> DATA TRANSFER OBJECT
interface ICreatSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    //
    getAll(): Promise<Specification[]>;
    create({
        name,
        description,
    }: ICreatSpecificationDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification>;
    findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository, ICreatSpecificationDTO };
