"use strict";

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("../../../../shared/container/providers/MailsProvider/in-memory/MailProviderInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _UsersRepositortyInMemory = require("../../repositories/in-memory/UsersRepositortyInMemory");

var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

/**
 * @Author: Jefferson Charlles
 * @Date:   2021-11-30 19:27:14
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 01:21:44
 */
let sendForgotPasswordMailUseCase;
let userTokensRepository;
let dateProvider;
let usersRepositoryInMemory;
let mailProvider;
describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositortyInMemory.UsersRepositortyInMemory();
    userTokensRepository = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, userTokensRepository, dateProvider, mailProvider);
  });
  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');
    await usersRepositoryInMemory.create({
      driver_license: '223929104',
      name: 'Timothy Grant',
      email: 'fimlajmu@oppummik.bw',
      password: '59214'
    });
    await sendForgotPasswordMailUseCase.execute('fimlajmu@oppummik.bw');
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to send an email uf user does no exists', async () => {
    await expect(sendForgotPasswordMailUseCase.execute('pereofi@fisumpop.br')).rejects.toEqual(new _AppError.AppError('User does not exists!'));
  });
  it('should be able to create an users token', async () => {
    const generateToken = jest.spyOn(userTokensRepository, 'create');
    await usersRepositoryInMemory.create({
      driver_license: '2312312',
      name: 'Milton Norris',
      email: 'le@po.cl',
      password: '59214'
    });
    await sendForgotPasswordMailUseCase.execute('le@po.cl');
    expect(generateToken).toBeCalled();
  });
});