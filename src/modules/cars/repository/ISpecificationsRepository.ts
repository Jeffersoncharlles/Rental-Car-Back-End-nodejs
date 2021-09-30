/*
interface contrato 
*/

import { Specification } from '../entities/Specification';

// DTO -> DATA TRANSFER OBJECT
interface ICreatSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    //
    getAll(): Specification[];
    create({ name, description }: ICreatSpecificationDTO): void;
    findByName(name: string): Specification;
}

export { ISpecificationsRepository, ICreatSpecificationDTO };
