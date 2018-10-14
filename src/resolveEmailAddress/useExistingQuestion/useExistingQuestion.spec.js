const path = require('path');

/*
The use of settimeout in these tests is terrible,
but process.nextTick() doesn't work here. I've not found
a solution to it yet.
*/

describe('useExistingQuestion', () => {
  const OLD_ENV = Object.assign({}, process.env);
  let stdin;

  beforeEach(() => {
    stdin = require('mock-stdin').stdin();
  });

  afterEach(() => {
    // reset the env variables to initial state
    process.env = OLD_ENV;
    // reset the modules which were required during the test (if any)
    jest.resetModules();
  });

  it('should return email and set use to true when user agrees to prompt', async () => {
    // set env var which is used as source of data.
    process.env.TEST_EMAIL_FILE = path.resolve(
      __dirname,
      '../../../test/mockData.json'
    );

    // must be required here as value is resolved on require
    const mockedData = require(process.env.TEST_EMAIL_FILE);
    const { useExistingQuestion } = require('./useExistingQuestion');

    setTimeout(() => stdin.send('y\r'), 100);

    const result = await useExistingQuestion();

    expect(result).toEqual({
      email: mockedData.provided,
      use: true
    });
  });

  it('should return email and set use to false when user disagrees with prompt', async () => {
    // set env var which is used as source of data.
    process.env.TEST_EMAIL_FILE = path.resolve(
      __dirname,
      '../../../test/mockData.json'
    );

    // must be required here as value is resolved on require
    const mockedData = require(process.env.TEST_EMAIL_FILE);
    const { useExistingQuestion } = require('./useExistingQuestion');

    setTimeout(() => stdin.send('n\r'), 100);

    const result = await useExistingQuestion();

    expect(result).toEqual({
      email: mockedData.provided,
      use: false
    });
  });

  it('should return email and set use to false when user responds with unsupported answer', async () => {
    // set env var which is used as source of data.
    process.env.TEST_EMAIL_FILE = path.resolve(
      __dirname,
      '../../../test/mockData.json'
    );

    // must be required here as value is resolved on require
    const mockedData = require(process.env.TEST_EMAIL_FILE);
    const { useExistingQuestion } = require('./useExistingQuestion');

    setTimeout(() => stdin.send('unsupported input\r'), 100);

    const result = await useExistingQuestion();

    expect(result).toEqual({
      email: mockedData.provided,
      use: false
    });
  });
});
