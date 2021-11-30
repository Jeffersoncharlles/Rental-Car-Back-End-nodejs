import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositortyInMemory } from '../../repositories/in-memory/UsersRepositortyInMemory';
import { UsersTokensRepositoryInMemory } from '../../repositories/in-memory/UsersTokensRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositortyInMemory;
let createUserUseCase: CreateUserUseCase;
let userTokensRepository: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe('Authenticate User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositortyInMemory();
        userTokensRepository = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            userTokensRepository,
            dateProvider
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    /** =======================
     *  teste criar usuario
     *========================* */
    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            driver_license: '0001223',
            email: 'user@teste.com',
            password: '123456',
            name: 'User test',
        };

        await createUserUseCase.execute(user);
        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty('token');
    });

    /** =======================
     *  teste usuario nao existe
     *========================* */
    it('should not be able to authenticate an nonexistent user', async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: 'false@email.com',
                password: '12345',
            })
        ).rejects.toEqual(new AppError('Email or password incorrect!'));
    });

    /** =======================
     *  testar senha errada
     *========================* */
    it('should not be able to authenticate with incorrect password', async () => {
        const user: ICreateUserDTO = {
            driver_license: '99999',
            email: 'user@user.com',
            password: '1234569',
            name: 'User test Error',
        };
        await createUserUseCase.execute(user);
        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectPassword',
            })
        ).rejects.toEqual(new AppError('Email or password incorrect!'));
    });
});
