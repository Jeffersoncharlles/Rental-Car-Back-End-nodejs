import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositortyInMemory } from '../../repositories/in-memory/UsersRepositortyInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUsecase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositortyInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositortyInMemory();
        authenticateUserUsecase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });
    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            driver_license: '0001223',
            email: 'user@teste.com',
            password: '123456',
            name: 'User test',
        };

        await createUserUseCase.execute(user);
        const result = await authenticateUserUsecase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty('token');
    });
});
