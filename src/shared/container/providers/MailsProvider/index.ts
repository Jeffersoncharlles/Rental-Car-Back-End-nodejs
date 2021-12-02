/**
 * @Author: Jefferson Charlles
 * @Date:   2021-12-01 21:35:02
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 03:29:24
 */
import { container } from 'tsyringe';

import { IMailProvider } from './IMailProvider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { SESMail } from './implementations/SESMail';

// const mailProvider = {
//     ethereal: container.resolve(),
//     ses: container.resolve(SESMail),
// };

if (process.env.MAIL_PROVIDER === 'ses') {
    container.registerInstance<IMailProvider>('MailProvider', new SESMail());
} else {
    container.registerInstance<IMailProvider>(
        'MailProvider',
        new EtherealMailProvider()
    );
}
