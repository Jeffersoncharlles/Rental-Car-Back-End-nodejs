/*

 * For a detailed explanation regarding each configuration property and type check, visit:

 * https://jestjs.io/docs/configuration

 */

export default {
    bail: true,

    clearMocks: true,

    coverageProvider: 'v8',

    preset: 'ts-jest',
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/*.ts'],
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov', 'text-summary'],

    testMatch: ['**/*.spec.ts'],
};
