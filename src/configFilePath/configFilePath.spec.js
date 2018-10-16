const homedir = require('os').homedir();
jest.unmock('./configFilePath');

describe('configFilePath', () => {
  const OLD_ENV = Object.assign({}, process.env);

  afterEach(() => {
    // reset the env variables to initial state
    process.env = OLD_ENV;
    // reset the modules which were required during the test (if any)
    jest.resetModules();
  });

  it('should return contents of TEST_EMAIL_ADDRESS env var if existing', () => {
    // set env var
    process.env.TEST_EMAIL_FILE = 'testhere/test.json';

    // must be required here as value is resolved on require
    const { configFilePath } = require('./configFilePath');

    expect(configFilePath).toBe(process.env.TEST_EMAIL_FILE);
  });

  it('should return os homedir if no TEST_EMAIL_ADDRESS env var exists', () => {
    // set env var
    process.env.TEST_EMAIL_FILE = undefined;

    // must be required here as value is resolved on require
    const { configFilePath } = require('./configFilePath');

    expect(configFilePath).toBe(`${homedir}/.test-email.json`);
  });
});
