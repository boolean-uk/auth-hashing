const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env

const hashString = (string) => bcrypt.hash(string, 12)

const compareStrings = (string, encryptedstring) => bcrypt.compare(string, encryptedstring)

const createToken = (username) => {
  const payload  = { username }
  return jwt.sign(payload, JWT_SECRET)
}

module.exports = { hashString, compareStrings, createToken }
