/**
 * @Author: Jefferson Charlles
 * @Date:   2021-12-01 21:09:52
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 03:16:50
 */

import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { IMailProvider } from '../IMailProvider';

@injectable()
class GmailProvider implements IMailProvider {
    private client: Transporter;

    // criar account test fake
    constructor() {
        this.client = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
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

export { GmailProvider };
