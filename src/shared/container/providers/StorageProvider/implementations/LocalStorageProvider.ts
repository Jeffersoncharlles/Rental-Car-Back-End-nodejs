import fs from 'fs';
import { resolve } from 'path';

import upload from '../../../../../config/upload';
import { IStorageProvider } from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
    async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            // pega da primeira pasta
            resolve(upload.tmpFolder, file),
            resolve(`${upload.tmpFolder}/${folder}`, file)
            // se for para avatar ele vai enviar para pasta avatar
            // se for car ele envia para pasta cars ou pasta que eu passar
        );

        return file;
    }
    async delete(file: string, folder: string): Promise<void> {
        const fileName = resolve(`${upload.tmpFolder}/${folder}`, file);

        try {
            await fs.promises.stat(fileName);
            //* verifica se o arquivo existe
        } catch {
            return;
        }
        await fs.promises.unlink(fileName);
        //* remove se o arquivo existe
    }
}

export { LocalStorageProvider };
