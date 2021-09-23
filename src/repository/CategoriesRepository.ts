import { Category } from '../model/Category';

// DTO -> DATA TRANSFER OBJECT
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

class CategoriesRepository {
    private categories: Category[];

    constructor() {
        this.categories = [];
    }

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
}

export { CategoriesRepository };
