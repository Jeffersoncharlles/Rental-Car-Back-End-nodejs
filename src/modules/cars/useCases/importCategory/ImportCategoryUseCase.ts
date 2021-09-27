import csvParse from 'csv-parse';
import fs from 'fs';

class ImportCategoryUseCase {
    execute(file: Express.Multer.File): void {
        // usar modelo nativo fs
        // usar a funcao createReadStream
        // permite fazer a leitura em partes
        // precisa passar o path do file
        const stream = fs.createReadStream(file.path);

        // eu crio uma const usando o parse
        // eu posso passar configuracao
        const parseFile = csvParse({});

        // usar a funcao pipe para
        // percorre o que ta sendo lindo
        // e joga para outra funcao arquivo etc
        stream.pipe(parseFile);

        parseFile.on('data', async (line) => {
            console.log(line);
        });
    }
}

export { ImportCategoryUseCase };
