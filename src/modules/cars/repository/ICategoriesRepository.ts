/*
interface contrato 
*/

import { Category } from '../infra/typeorm/Category';

// DTO -> DATA TRANSFER OBJECT
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    getAll(): Promise<Category[]>;
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
