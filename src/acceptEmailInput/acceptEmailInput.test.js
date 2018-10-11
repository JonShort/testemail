const assert = require('assert');

const acceptEmailInput = require('./acceptEmailInput');

describe('acceptEmailInput', () => {
  let stdin;

  beforeEach(() => {
    stdin = require('mock-stdin').stdin();
  });

  it('asks for email address', async () => {
    const providedEmail = 'test@test.com';

    process.nextTick(() => {
      stdin.send(`${providedEmail}\r`);
    });

    const result = await acceptEmailInput();

    assert.equal(result, providedEmail);
  });
});
