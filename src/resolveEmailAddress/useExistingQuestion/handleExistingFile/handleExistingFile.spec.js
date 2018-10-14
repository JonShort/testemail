const homedir = require('os').homedir();
const path = require('path');

describe('handleExistingFile', () => {
  const OLD_ENV = Object.assign({}, process.env);

  afterEach(() => {
    // reset the env variables to initial state
    process.env = OLD_ENV;
    // reset the modules which were required during the test (if any)
    jest.resetModules();
  });

  it('should return the `provided` value from the data file sourced', async () => {
    // set env var which is used as source of data.
    process.env.TEST_EMAIL_FILE = path.resolve(
      __dirname,
      '../../../../test/mockData.json'
    );

    // must be required here as value is resolved on require
    const handleExistingFile = require('./handleExistingFile');

    const mockedData = require(process.env.TEST_EMAIL_FILE);
    const result = await handleExistingFile();

    expect(result).toBe(mockedData.provided);
  });

  it('should throw if file does not exist', async () => {
    // set env var which is used as source of data.
    process.env.TEST_EMAIL_FILE = './doesnotexist.json';

    // must be required here as value is resolved on require
    const handleExistingFile = require('./handleExistingFile');

    try {
      await handleExistingFile();
      expect('this should not be executed due to error catch').toBe(false);
    } catch (err) {
      expect(err.code).toEqual('ENOENT');
    }
  });
});
