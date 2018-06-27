const fs = require('fs');

const text = 'Some text here that has been written to a file';

fs.writeFile('src/writtenFile.txt', text, err => {
  if (err) throw err;

  console.log('file written! 🤩\r\n');
});

console.log('ran');
