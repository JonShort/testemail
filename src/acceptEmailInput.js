const acceptEmailInput = () => {
  return new Promise((resolve, reject) => {
    const readline = require('readline');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const emailRegex = new RegExp(
      "^([A-Za-z0-9!#$%&'*+/=?^_`{|}~.-])+@([A-Za-z0-9-])+([.]([A-Za-z0-9-]+))+[A-Za-z]$"
    );

    rl.question(
      "\r\nEnvironment variable 'process.env.TEST_EMAIL_ADDRESS' not found,\r\nEnter an email to be used:\r\n",
      answer => {
        const isAnswerValid = emailRegex.test(answer);

        rl.close();

        if (!isAnswerValid) {
          reject(new Error('Provided email is invalid'));
        } else {
          resolve(answer);
        }
      }
    );
  });
};

module.exports = acceptEmailInput;
