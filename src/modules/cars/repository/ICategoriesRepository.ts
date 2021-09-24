/*
interface contrato 
*/

import { Category } from '../model/Category';

// DTO -> DATA TRANSFER OBJECT
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Category;
    getAll(): Category[];
    create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
