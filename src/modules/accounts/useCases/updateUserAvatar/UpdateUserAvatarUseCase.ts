//* Adicionar Coluna avatar na tabela de users
//* Refatorar Usuario com coluna avatar
//* configurar upload multer
//* Criar regra de negocio do upload
//* criar controller

import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '../../../../shared/container/providers/StorageProvider/IStorageProvider';
import { UsersRepository } from '../../infra/typeorm/repositories/UsersRepository';

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: UsersRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) {}
    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (user.avatar) {
            await this.storageProvider.delete(user.avatar, 'avatar');
        }
        await this.storageProvider.save(avatar_file, 'avatar');

        user.avatar = avatar_file;

        await this.usersRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase };
