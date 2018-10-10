const assert = require('assert');

const acceptEmailInput = require('./acceptEmailInput');

describe('acceptEmailInput', () => {
  let stdin;

  beforeEach(() => {
    stdin = require('mock-stdin').stdin();
  });

  it('asks for email address', async () => {
    process.nextTick(() => {
      stdin.send('test@test.com\r');
    });

    const result = await acceptEmailInput();

    console.log(result);
  });
});
