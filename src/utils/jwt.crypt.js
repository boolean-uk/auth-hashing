const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function createToken(username) {
  const payload = { username };
  return jwt.sign(payload, JWT_SECRET);
}

module.exports = {
  createToken,
};
