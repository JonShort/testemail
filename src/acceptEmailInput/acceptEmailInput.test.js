const assert = require('assert');

const {
  acceptEmailInput,
  _private: { errorMessage }
} = require('./acceptEmailInput');

describe('acceptEmailInput', () => {
  let stdin;

  beforeEach(() => {
    stdin = require('mock-stdin').stdin();
  });

  it('returns same input if valid email', async () => {
    const providedEmail = 'test@test.com';

    process.nextTick(() => {
      stdin.send(`${providedEmail}\r`);
    });

    const result = await acceptEmailInput();

    expect(result).toBe(providedEmail);
  });

  it('throws if the provided email is invalid', async () => {
    const providedEmail = 'invalid!';

    process.nextTick(() => {
      stdin.send(`${providedEmail}\r`);
    });

    try {
      await acceptEmailInput();
    } catch (err) {
      expect(err).toBe(errorMessage);
    }
  });
});
