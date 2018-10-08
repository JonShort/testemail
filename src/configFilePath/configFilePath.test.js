const assert = require('assert');

describe('configFilePath', () => {
  const OLD_ENV = Object.assign({}, process.env);

  afterEach(() => {
    // reset the env variables to initial state
    process.env = OLD_ENV;
    // reset the modules which were required during the test (if any)
    delete require.cache[require.resolve('./configFilePath')];
  });

  it('should return contents of TEST_EMAIL_ADDRESS env var', () => {
    // set env var
    process.env.TEST_EMAIL_FILE = 'testhere/test.json';

    console.log(process.env.TEST_EMAIL_FILE);

    // must be required here as value is resolved on require
    const configFilePath = require('./configFilePath');

    assert.equal(configFilePath, process.env.TEST_EMAIL_FILE);
  });
});
