module.exports = {
  globalSetup: './jest.setup.js',
  globalTeardown: './jest.teardown.js',
  testEnvironment: 'node',
  testRegex: '(/jest/backendTests/.*|(\\.|/)(test|spec))\\.js$', // Match all test files in the "backendTests" directory
};