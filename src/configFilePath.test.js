const assert = require('assert');

describe('configFilePath', () => {
  it('should return contents of TEST_EMAIL_ADDRESS env var', function() {
    const OLD_ENV = process.env;
    // set env var
    process.env.TEST_EMAIL_FILE = 'testhere/test.json';

    // must be required here as value is resolved on require
    const configFilePath = require('./configFilePath');

    assert.equal(configFilePath, process.env.TEST_EMAIL_FILE);

    // clear env var
    process.env = OLD_ENV;
    jest.resetModules();
  });
});
