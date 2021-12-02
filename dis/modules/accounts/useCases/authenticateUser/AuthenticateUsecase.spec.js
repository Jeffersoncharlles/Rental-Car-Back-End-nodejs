"use strict";

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _UsersRepositortyInMemory = require("../../repositories/in-memory/UsersRepositortyInMemory");

var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");

var _CreateUserCase = require("../createUser/CreateUserCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let authenticateUserUseCase;
let usersRepositoryInMemory;
let createUserUseCase;
let userTokensRepository;
let dateProvider;
describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositortyInMemory.UsersRepositortyInMemory();
    userTokensRepository = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, userTokensRepository, dateProvider);
    createUserUseCase = new _CreateUserCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  /** =======================
   *  teste criar usuario
   *========================* */

  it('should be able to authenticate an user', async () => {
    const user = {
      driver_license: '0001223',
      email: 'user@teste.com',
      password: '123456',
      name: 'User test'
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty('token');
  });
  /** =======================
   *  teste usuario nao existe
   *========================* */

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(authenticateUserUseCase.execute({
      email: 'false@email.com',
      password: '12345'
    })).rejects.toEqual(new _AppError.AppError('Email or password incorrect!'));
  });
  /** =======================
   *  testar senha errada
   *========================* */

  it('should not be able to authenticate with incorrect password', async () => {
    const user = {
      driver_license: '99999',
      email: 'user@user.com',
      password: '1234569',
      name: 'User test Error'
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: 'incorrectPassword'
    })).rejects.toEqual(new _AppError.AppError('Email or password incorrect!'));
  });
});