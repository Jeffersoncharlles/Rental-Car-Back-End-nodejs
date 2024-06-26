import { S3 } from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import { resolve } from 'path';

import upload from '../../../../../config/upload';
import { IStorageProvider } from '../IStorageProvider';

class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION,
        });
    }
    async save(file: string, folder: string): Promise<string> {
        const originalName = resolve(upload.tmpFolder, file);

        // ele vai pegar o arquivo msm
        const fileContent = await fs.promises.readFile(originalName);

        // obter o type
        const ContentType = mime.getType(originalName);

        // subir para aws
        await this.client
            .putObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                ContentType,
            })
            .promise();

        // remover depois de ter subido
        await fs.promises.unlink(originalName);

        return file;
    }
    async delete(file: string, folder: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file,
            })
            .promise();
    }
}

export { S3StorageProvider };
