const fs = require('fs');
const resolveEmailAddress = require('../resolveEmailAddress/resolveEmailAddress');
const { configFilePath } = require('../configFilePath/configFilePath');

const generateTestEmail = async () => {
  try {
    const userEmail = await resolveEmailAddress();

    const userEmailSplit = userEmail.split('@');
    const currentDate = Date.now();

    const generatedEmail = `${userEmailSplit[0]}+${currentDate}@${
      userEmailSplit[1]
    }`;
    const dateOfGeneration = Date(currentDate);

    const dashArray = new Array(generatedEmail.length).fill('-');
    const dashes = dashArray.join('');

    const textToWrite = `{
  "provided": "${userEmail}",
  "generated": "${generatedEmail}",
  "date": "${dateOfGeneration}"
}`;

    fs.writeFile(configFilePath, textToWrite, err => {
      if (err) throw err;

      console.log(
        '\x1b[32m%s\x1b[0m',
        `\r\nEmail generated on ${dateOfGeneration}`
      );
      console.log('\x1b[32m%s\x1b[0m', dashes);
      console.log(generatedEmail);
      console.log('\x1b[32m%s\x1b[0m', dashes);
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = generateTestEmail;
