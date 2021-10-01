/*
# receber o arquivo
# salvar tmp dele 
# ler o tmp e jogar para uma variavel
# percorrer linha por linha e salvar um array
# percorrer esse array e salvar no db
*/

import csvParse from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '../../repository/ICategoriesRepository';

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
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

            parseFile
                .on('data', async (line) => {
                    // ['name','description']
                    // console.log(line)
                    const [name, description] = line;
                    categories.push({
                        name,
                        description,
                    });
                })
                .on('end', () => {
                    // remover o arquivo tmp
                    fs.promises.unlink(file.path);
                    resolve(categories);
                })
                .on('error', (err) => {
                    reject(err);
                });
            // ele tem que ser colocado em uma promise
            // e da um . on para da o retorno em resolve
            // . om para o retorno no error
        });
    }

    execute = async (file: Express.Multer.File): Promise<void> => {
        const categories = await this.loadCategories(file);

        // console.log(categories);

        // map percorre dado por dado igual o foreach
        categories.map(async (c) => {
            const { name, description } = c;
            const existCategory = await this.categoriesRepository.findByName(
                name
            );
            if (!existCategory) {
                await this.categoriesRepository.create({
                    name,
                    description,
                });
            }
        });
    };
}

export { ImportCategoryUseCase };
