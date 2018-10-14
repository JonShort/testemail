const fs = require('fs');
const { acceptEmailInput } = require('./acceptEmailInput/acceptEmailInput');
const {
  useExistingQuestion
} = require('./useExistingQuestion/useExistingQuestion');
const configFilePath = require('../configFilePath/configFilePath');

const resolveEmailAddress = () => {
  return new Promise(async resolve => {
    try {
      if (process.env.TEST_EMAIL_ADDRESS) {
        resolve(process.env.TEST_EMAIL_ADDRESS);
        return;
      }

      if (fs.existsSync(configFilePath)) {
        const { use, email } = await useExistingQuestion();

        if (use) {
          resolve(email);
          return;
        }
      }

      const inputEmail = await acceptEmailInput();
      resolve(inputEmail);
    } catch (e) {
      console.error('\x1b[31m%s\x1b[0m', e);
    }
  });
};

module.exports = resolveEmailAddress;
