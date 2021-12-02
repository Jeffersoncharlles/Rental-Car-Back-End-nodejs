/**
 * @Author: Jefferson Charlles
 * @Date:   2021-11-30 19:41:10
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 01:22:35
 */
import { IMailProvider } from '../IMailProvider';

class MailProviderInMemory implements IMailProvider {
    private message: any[] = [];
    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        this.message.push(to, subject, variables, path);
    }
}

export { MailProviderInMemory };
