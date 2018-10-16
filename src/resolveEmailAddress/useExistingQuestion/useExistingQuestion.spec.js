const path = require('path');
const { useExistingQuestion } = require('./useExistingQuestion');
jest.unmock('./useExistingQuestion');
jest.unmock('mock-stdin');

describe('useExistingQuestion', () => {
  let stdin;

  beforeEach(() => {
    stdin = require('mock-stdin').stdin();
  });

  it('should return email and set use to true when user agrees to prompt', async () => {
    const mockedData = require(path.resolve('test/mockData.json'));

    process.nextTick(() => stdin.send('y\r'));

    const result = await useExistingQuestion();

    expect(result).toEqual({
      email: mockedData.provided,
      use: true
    });
  });

  it('should return email and set use to false when user disagrees with prompt', async () => {
    const mockedData = require(path.resolve('test/mockData.json'));

    process.nextTick(() => stdin.send('n\r'));

    const result = await useExistingQuestion();

    expect(result).toEqual({
      email: mockedData.provided,
      use: false
    });
  });

  it('should return email and set use to false when user responds with unsupported answer', async () => {
    const mockedData = require(path.resolve('test/mockData.json'));

    process.nextTick(() => stdin.send('unsupported input\r'));

    const result = await useExistingQuestion();

    expect(result).toEqual({
      email: mockedData.provided,
      use: false
    });
  });
});
