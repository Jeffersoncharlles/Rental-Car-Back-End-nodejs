import { getRepository, Repository } from 'typeorm';

import { Category } from '../../entities/Category';
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from '../ICategoriesRepository';

// Singleton Pattern

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    private static INSTANCE: CategoriesRepository;
    // public static getInstance(): CategoriesRepository {
    //     if (!CategoriesRepository.INSTANCE) {
    //         // SE NAO TIVER NENHUM VALOR ATRIBUIDO A ELE
    //         CategoriesRepository.INSTANCE = new CategoriesRepository();
    //     }
    //     return CategoriesRepository.INSTANCE;
    //     // se ja tiver agente returna essa instancia
    // }

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
