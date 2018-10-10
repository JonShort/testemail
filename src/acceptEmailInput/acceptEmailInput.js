#!/usr/bin/env node
const readline = require('readline');

const acceptEmailInput = () => {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const emailRegex = new RegExp(
      "^([A-Za-z0-9!#$%&'*+/=?^_`{|}~.-])+@([A-Za-z0-9-])+([.]([A-Za-z0-9-]+))+[A-Za-z]$"
    );

    rl.question('\r\nEnter the email address to be used:\r\n', answer => {
      const isAnswerValid = emailRegex.test(answer);

      rl.close();

      if (!isAnswerValid) {
        reject(new Error('Provided email is invalid'));
      } else {
        console.log(
          '\x1b[2m%s\x1b[0m',
          "\r\nProtip: Set the Environment variable 'TEST_EMAIL_ADDRESS' to skip this step!"
        );
        resolve(answer);
      }
    });
  });
};

module.exports = acceptEmailInput;
