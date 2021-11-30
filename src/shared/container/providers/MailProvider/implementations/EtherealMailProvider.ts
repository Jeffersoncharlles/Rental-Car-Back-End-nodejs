import fs from 'fs';
import handlebars from 'handlebars';
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
    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        // vou da um fs para lear o arquivo
        const templateFileCOntent = fs.readFileSync(path).toString('utf-8');

        // vou compilar para o handlebars entender
        const templateParse = handlebars.compile(templateFileCOntent);

        // gero um template html passando as variaveis para o compilado
        const templateHTML = templateParse(variables);

        const message = await this.client.sendMail({
            to,
            from: 'Rentx <noreplay@rentx.com>',
            subject,
            html: templateHTML,
        });

        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export { EtherealMailProvider };
