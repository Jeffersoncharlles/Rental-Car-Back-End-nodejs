/**
 * @Author: Jefferson Charlles
 * @Date:   2021-10-07 04:31:24
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 20:00:45
 */
import { Connection, createConnection, getConnectionOptions } from 'typeorm';

// interface IOptions {
//     host: string;
// }

// getConnectionOptions().then((options) => {
//     const newOptions = options as IOptions;
//     newOptions.host = 'database';
//     createConnection({
//         ...options,
//     });
// });

// pegando a conexao e passando ela para ser usada na aplicacao
// export default async (host = 'database'): Promise<Connection> => {
//     const defaultOptions = await getConnectionOptions();

//     return createConnection(
//         Object.assign(defaultOptions, {
//             host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
//             database:
//                 process.env.NODE_ENV === 'test'
//                     ? 'rentx_test'
//                     : defaultOptions.database,
//         })
//     );
// };
export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            database:
                process.env.NODE_ENV === 'test'
                    ? 'rentx_test'
                    : defaultOptions.database,
        })
    );
};
