/**
 * @Author: Jefferson Charlles
 * @Date:   2021-10-07 04:31:24
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 01:17:13
 */
import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
    tmpFolder,

    storage: multer.diskStorage({
        destination: tmpFolder,
        filename: (request, file, callback) => {
            const fileHash = crypto.randomBytes(16).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};
