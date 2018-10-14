const homedir = require('os').homedir();
const configFilePath =
  process.env.TEST_EMAIL_FILE || `${homedir}/.test-email.json`;

module.exports = { configFilePath };
