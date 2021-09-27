import csvParse from 'csv-parse';
import fs from 'fs';

import { ICategoriesRepository } from '../../repository/ICategoriesRepository';

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    loadCategories(file: Express.Multer.File): IImportCategory[] {
        // usar modelo nativo fs
        // usar a funcao createReadStream
        // permite fazer a leitura em partes
        // precisa passar o path do file
        const stream = fs.createReadStream(file.path);

        const categories: IImportCategory[] = [];

        // eu crio uma const usando o parse
        // eu posso passar configuracao
        const parseFile = csvParse({});

        // usar a funcao pipe para
        // percorre o que ta sendo lindo
        // e joga para outra funcao arquivo etc
        stream.pipe(parseFile);

        parseFile.on('data', async (line) => {
            // ['name','description']
            // console.log(line)
            const [name, description] = line;
            categories.push({
                name,
                description,
            });
        });
        return categories;
    }

    execute(file: Express.Multer.File): void {
        const categories = this.loadCategories(file);

        console.log(categories);
    }
}

export { ImportCategoryUseCase };
