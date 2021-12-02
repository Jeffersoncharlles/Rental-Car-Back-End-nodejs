import { container } from 'tsyringe';

import { IMailProvider } from './IMailProvider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { SESMail } from './implementations/SESMail';

const mailProvider = {
    local: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMail),
};

container.registerInstance<IMailProvider>(
    'MailProvider',
    mailProvider[process.env.MAIL_PROVIDER]
);
