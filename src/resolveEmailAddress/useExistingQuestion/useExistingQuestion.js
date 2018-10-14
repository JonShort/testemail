const readline = require('readline');
const handleExistingFile = require('./handleExistingFile/handleExistingFile');

const errorMessage = answer => `Sorry, I don't understand ${answer}, skipping.`;

const useExistingQuestion = async () => {
  const existingEmail = await handleExistingFile();

  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    let isUsingExisting = false;

    rl.question(`Use ${existingEmail} again? [Y/N]\r\n`, answer => {
      switch (answer.trim().toLowerCase()) {
        case 'y':
          isUsingExisting = true;
          break;

        case 'n':
          break;

        default:
          console.log(errorMessage(answer));
      }

      rl.close();
      resolve({
        email: existingEmail,
        use: isUsingExisting
      });
    });
  });
};

module.exports = {
  useExistingQuestion,
  _private: {
    errorMessage
  }
};
