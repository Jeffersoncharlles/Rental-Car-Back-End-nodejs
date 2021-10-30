import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositortyInMemory } from '../../repositories/in-memory/UsersRepositortyInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositortyInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositortyInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
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
    it('should not be able to authenticate an nonexistent user', () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'false@email.com',
                password: '12345',
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    /** =======================
     *  testar senha errada
     *========================* */
    it('should not be able to authenticate with incorrect password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: '99999',
                email: 'user@user.com',
                password: '1234569',
                name: 'User test Error',
            };

            await createUserUseCase.execute(user);
            await authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectPassword',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
