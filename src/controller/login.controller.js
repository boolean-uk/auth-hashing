const { selectUser } = require("../domain/user.domain");
const { compareString } = require("../utils/bcrypt.crypt");
const { createToken } = require("../utils/jwt.crypt");

async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const foundUser = await selectUser(username);
    if (!foundUser) throw new Error("user not found");

    const passwordMatched = await compareString(password, foundUser.password);
    if (!passwordMatched) throw new Error("password doesn't match");

    const token = createToken(username);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  loginUser,
};
