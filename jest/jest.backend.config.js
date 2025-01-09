module.exports = {
    globalSetup: './jest.setup.js',
    globalTeardown: './jest.teardown.js',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/backendTests/**/*.test.js'], // Match all test files in the "tests" directory
  };