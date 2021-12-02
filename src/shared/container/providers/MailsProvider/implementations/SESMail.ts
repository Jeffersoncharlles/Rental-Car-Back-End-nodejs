/**
 * @Author: Jefferson Charlles
 * @Date:   2021-12-01 21:09:52
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 01:22:40
 */
import { SES } from 'aws-sdk';
import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { IMailProvider } from '../IMailProvider';

@injectable()
class SESMail implements IMailProvider {
    private client: Transporter;

    // criar account test fake
    constructor() {
        this.client = nodemailer.createTransport({
            SES: new SES({
                apiVersion: '2010-12-01',
                region: process.env.AWS_SES_VERSION,
            }),
        });
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

        await this.client.sendMail({
            to,
            from: `${process.env.NAME_API} <${process.env.EMAIL_DOMAIN}>`,
            subject,
            html: templateHTML,
        });
    }
}

export { SESMail };
