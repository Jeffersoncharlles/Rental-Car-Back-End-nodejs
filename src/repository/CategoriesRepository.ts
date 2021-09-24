import { Category } from '../model/Category';
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from './ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[];

    constructor() {
        this.categories = [];
    }

    /*= =================================CREATE============================================ */
    /*= ================================================================================== */
    create({ description, name }: ICreateCategoryDTO): void {
        // void para falar que nao tem retorno

        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });
        // isso e mesma coisa de eu da um category.name

        // category.name = name;
        // category.description = description;
        // category.created_at = new Date();

        this.categories.push(category);
        // push ele e um insert dentro do array
    }
    /*= ================================================================================== */
    /*= =================================GET-ALL============================================ */
    getAll(): Category[] {
        return this.categories;
    }
    /*= ================================================================================== */
    /*= =================================FIND-BY-NAME====================================== */
    findByName(name: string): Category {
        const category = this.categories.find((c) => c.name === name);
        return category;
    }
    /*= ================================================================================== */
    /*= =================================FIND-BY-NAME====================================== */
}

export { CategoriesRepository };
