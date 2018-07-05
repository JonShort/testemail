const readline = require('readline');
const handleExistingFile = require('./handleExistingFile');

const useExistingQuestion = async () => {
  const existingEmail = await handleExistingFile();

  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(`Use ${existingEmail} again? [Y/N]\r\n`, answer => {
      if (answer.trim().toLowerCase() === 'n') {
        rl.close();
        resolve({
          email: existingEmail,
          use: false
        });
      }

      rl.close();
      resolve({
        email: existingEmail,
        use: true
      });
    });
  });
};

module.exports = useExistingQuestion;
