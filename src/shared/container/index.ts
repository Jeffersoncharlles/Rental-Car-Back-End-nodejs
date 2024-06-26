/**
 * @Author: Jefferson Charlles
 * @Date:   2021-10-07 04:31:24
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 01:01:44
 */
import { container } from 'tsyringe';

import './providers/MailsProvider';
import './providers/DateProvider';
import './providers/StorageProvider';

import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '../../modules/accounts/repositories/IUsersTokensRepository';
import { CarsImageRepository } from '../../modules/cars/infra/typeorm/repositories/CarsImageRepository';
import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICarsImagesRepository } from '../../modules/cars/repository/ICarsImagesRepository';
import { ICarsRepository } from '../../modules/cars/repository/ICarsRepository';
import { ICategoriesRepository } from '../../modules/cars/repository/ICategoriesRepository';
import { ISpecificationsRepository } from '../../modules/cars/repository/ISpecificationsRepository';
import { RentalsRepository } from '../../modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { IRentalsRepository } from '../../modules/rentals/repository/IRentalsRepository';
/** =======================
 *     COMMENT BLOCK
 *  Interfaces de repositorios
 *  fazer a injeção de dependencias
 *========================* */

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    'SpecificationsRepository',
    SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
    'CarsImagesRepository',
    CarsImageRepository
);

container.registerSingleton<IRentalsRepository>(
    'RentalsRepository',
    RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
    'UsersTokensRepository',
    UsersTokensRepository
);
