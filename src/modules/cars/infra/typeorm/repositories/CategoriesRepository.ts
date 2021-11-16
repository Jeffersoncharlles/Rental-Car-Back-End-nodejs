import { getRepository, Repository } from 'typeorm';

import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from '../../../repository/ICategoriesRepository';
import { Category } from '../Category';

// Singleton Pattern

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    /*= =================================CREATE============================================ */
    /*= ================================================================================== */
    async create({ description, name }: ICreateCategoryDTO): Promise<void> {
        // void para falar que nao tem retorno

        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category);
    }
    /*= ================================================================================== */
    /*= =================================GET-ALL============================================ */
    async getAll(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }
    /*= ================================================================================== */
    /*= =================================FIND-BY-NAME====================================== */
    async findByName(name: string): Promise<Category> {
        // Select * from categories where name = "name" limite 1
        const category = await this.repository.findOne({ name });
        return category;
    }
    /*= ================================================================================== */
    /*= =================================FIND-BY-NAME====================================== */
}

export { CategoriesRepository };
