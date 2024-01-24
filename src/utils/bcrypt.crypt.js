const bcrypt = require("bcrypt");

function hashString(string) {
  return bcrypt.hash(string, 12);
}

function compareString(string, encryptedString) {
  return bcrypt.compare(string, encryptedString);
}

module.exports = {
  compareString,
  hashString,
};
