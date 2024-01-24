const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = process.env.JWT_SECRET;

const { getUserByUsernameDb } = require("../domains/user");

async function loginUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ error: "Missing fields in request body" });
  }

  const foundUser = await getUserByUsernameDb(username);

  if (!foundUser) {
    return res
      .status(404)
      .send({ error: "No user found with the provided username" });
  }

  const hashedPassword = foundUser.password;

  const passwordIsValid = await bcrypt.compare(password, hashedPassword);

  if (!passwordIsValid) {
    return res.status(409).send({ error: "Password is incorrect" });
  }

  const userToken = jwt.sign({ username: foundUser.username }, secret);

  return res.status(201).send({ username: userToken });
}

module.exports = {
  loginUser,
};
