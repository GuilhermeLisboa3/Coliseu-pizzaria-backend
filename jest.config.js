module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  testEnvironment: '@quramy/jest-prisma/environment',
  setupFilesAfterEnv: ['<rootDir>/tests/infra/database/postgres/mocks/setup-prisma.ts'],
  clearMocks: true
}
