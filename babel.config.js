/**
 * @Author: Jefferson Charlles
 * @Date:   2021-12-02 18:19:04
 * @Last Modified by:   Jefferson Charlles
 * @Last Modified time: 2021-12-02 19:36:50
 */
module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
    ],
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '@modules': './src/modules',
                    '@config': './src/config',
                    '@shared': './src/shared',
                    '@errors': './src/errors',
                    '@utils': './src/utils',
                },
            },
        ],
        'babel-plugin-transform-typescript-metadata',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
};
