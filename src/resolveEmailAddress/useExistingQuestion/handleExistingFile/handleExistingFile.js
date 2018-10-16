const fs = require('fs');
const { configFilePath } = require('../../../configFilePath/configFilePath');

const handleExistingFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(configFilePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const obj = JSON.parse(data);

      resolve(obj.provided);
    });
  });
};

module.exports = { handleExistingFile };
