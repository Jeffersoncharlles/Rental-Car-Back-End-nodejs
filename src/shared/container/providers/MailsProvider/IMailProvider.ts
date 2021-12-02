/**
 * @Author: Jefferson Charlles
 * @Date:   2021-11-30 13:09:33
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 01:01:35
 */
interface IMailProvider {
    sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void>;
}

export { IMailProvider };
