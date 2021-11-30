import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '../../../../shared/errors/AppError';
import { UsersRepositortyInMemory } from '../../repositories/in-memory/UsersRepositortyInMemory';
import { UsersTokensRepositoryInMemory } from '../../repositories/in-memory/UsersTokensRepositoryInMemory';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let userTokensRepository: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersRepositoryInMemory: UsersRepositortyInMemory;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Mail', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositortyInMemory();
        userTokensRepository = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            userTokensRepository,
            dateProvider,
            mailProvider
        );
    });

    it('should be able to send a forgot password mail to user', async () => {
        const sendMail = jest.spyOn(mailProvider, 'sendMail');

        await usersRepositoryInMemory.create({
            driver_license: '223929104',
            name: 'Timothy Grant',
            email: 'fimlajmu@oppummik.bw',
            password: '59214',
        });

        await sendForgotPasswordMailUseCase.execute('fimlajmu@oppummik.bw');

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to send an email uf user does no exists', async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute('pereofi@fisumpop.br')
        ).rejects.toEqual(new AppError('User does not exists!'));
    });

    it('should be able to create an users token', async () => {
        const generateToken = jest.spyOn(userTokensRepository, 'create');

        await usersRepositoryInMemory.create({
            driver_license: '2312312',
            name: 'Milton Norris',
            email: 'le@po.cl',
            password: '59214',
        });

        await sendForgotPasswordMailUseCase.execute('le@po.cl');

        expect(generateToken).toBeCalled();
    });
});
