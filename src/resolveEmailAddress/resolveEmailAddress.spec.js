const { resolveEmailAddress } = require('./resolveEmailAddress');
jest.unmock('./resolveEmailAddress');

describe('resolveEmailAddress', () => {
  const OLD_ENV = Object.assign({}, process.env);

  afterEach(() => {
    // reset the env variables to initial state
    process.env = OLD_ENV;
    // reset the modules which were required during the test (if any)
    jest.resetModules();
  });

  it('should return TEST_EMAIL_ADDRESS env var if existing', async () => {
    process.env.TEST_EMAIL_ADDRESS = 'testEmail@test.com';

    const result = await resolveEmailAddress();

    expect(result).toBe('testEmail@test.com');
  });

  it('should return email stored in config file, if file exists', async () => {
    process.env.TEST_EMAIL_ADDRESS = undefined;

    const { configFilePath } = require('../configFilePath/configFilePath');
    const { provided: mockedData } = require(configFilePath);

    const result = await resolveEmailAddress();

    expect(result).toBe(mockedData);
  });

  it('should return email provided by user if no config file exists', async () => {
    process.env.TEST_EMAIL_ADDRESS = undefined;

    // a bit hacky as it relies on configFilePath resolving TEST_EMAIL_FILE
    process.env.TEST_EMAIL_FILE = 'does not exist';
    jest.unmock('../configFilePath/configFilePath');

    const result = await resolveEmailAddress();

    expect(result).toBe('test@test.com');
  });
});
