const fs = require('fs');

if (!process.env.TEST_EMAIL_ADDRESS) {
  throw new Error('Please set the TEST_EMAIL_ADDRESS environment variable');
}

const path = process.env.TEST_EMAIL_PATH || './src/testing-email-path.js';
const userEmail = process.env.TEST_EMAIL_ADDRESS;

const text = 'Some text here that has been written to a file';

fs.writeFile('src/writtenFile.txt', text, err => {
  if (err) throw err;

  console.log('file written! 🤩\r\n');
});

console.log('ran');
