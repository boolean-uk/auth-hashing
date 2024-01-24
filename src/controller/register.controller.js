const { createUser } = require("../domain/user.domain");

const { hashString } = require("../utils/bcrypt.crypt");

async function registerUser(req, res) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await hashString(password);

    const newUser = await createUser(username, hashedPassword);
    res.status(201).json({user: newUser})
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  registerUser,
};
