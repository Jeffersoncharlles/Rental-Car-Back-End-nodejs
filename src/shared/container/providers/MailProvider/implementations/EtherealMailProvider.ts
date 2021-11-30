import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { IMailProvider } from '../IMailProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    // criar account test fake
    constructor() {
        nodemailer
            .createTestAccount()
            .then((account) => {
                const transporter = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass,
                    },
                });

                // criei o transporter e depois
                // defini o transporter do nodemailer como esse criado
                this.client = transporter;
            })
            .catch((err) => console.error(err));
    }
    async sendMail(to: string, subject: string, body: string): Promise<void> {
        const message = await this.client.sendMail({
            to,
            from: 'Rentx <noreplay@rentx.com>',
            subject,
            text: body,
            html: body,
        });

        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export { EtherealMailProvider };
