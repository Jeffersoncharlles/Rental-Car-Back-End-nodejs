/*
interface contrato 
*/

import { Specification } from '../model/Specification';

// DTO -> DATA TRANSFER OBJECT
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    // findByName(name: string): Specification;
    // getAll(): Specification[];
    // create({ name, description }: ICreateCategoryDTO): void;
}

export { ISpecificationsRepository, ICreateCategoryDTO };
