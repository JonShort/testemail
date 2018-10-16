const path = require('path');
const { handleExistingFile } = require('./handleExistingFile');
jest.unmock('./handleExistingFile');

describe('handleExistingFile', () => {
  it('should return the `provided` value from the data file sourced', async () => {
    const mockedData = require(path.resolve('test/mockData.json'));
    const result = await handleExistingFile();

    expect(result).toBe(mockedData.provided);
  });
});
