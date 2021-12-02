/**
 * @Author: Jefferson Charlles
 * @Date:   2021-10-07 04:31:24
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 18:09:09
 */
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
