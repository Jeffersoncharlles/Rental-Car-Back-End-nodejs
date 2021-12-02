/**
 * @Author: Jefferson Charlles
 * @Date:   2021-12-01 21:53:05
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 01:15:29
 */
import { container } from 'tsyringe';

import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import { IStorageProvider } from './IStorageProvider';

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider,
};
container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    diskStorage[process.env.DISK]
);
