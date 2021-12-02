/**
 * @Author: Jefferson Charlles
 * @Date:   2021-12-01 21:35:02
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 01:25:48
 */
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
