/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*-protocols.js',
    '!**/protocols/**',
    '!**/test/**'
  ],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  verbose: true,
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
};
