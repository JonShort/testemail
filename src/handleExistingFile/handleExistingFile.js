const readline = require('readline');
const fs = require('fs');
const configFilePath = require('../configFilePath/configFilePath');

const handleExistingFile = () => {
  return new Promise(resolve => {
    fs.readFile(configFilePath, 'utf8', (err, data) => {
      if (err) throw err;

      const obj = JSON.parse(data);

      resolve(obj.provided);
    });
  });
};

module.exports = handleExistingFile;
