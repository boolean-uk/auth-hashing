const bcrypt = require("bcrypt");
const { createUserDb, getUserByUsernameDb } = require("../domains/user");

async function registerUser(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({ error: "Missing fields in request body" });
    }

    const usernameIsDuplicate = await getUserByUsernameDb(username);

    if (usernameIsDuplicate) {
      return res
        .status(409)
        .send({ error: "A user with the provided username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await createUserDb(username, hashedPassword);

    return res.status(201).send({ user: createdUser });
  } catch (e) {
    return res.status(e.status ?? 500).send({ error: e.message });
  }
}

module.exports = {
  registerUser,
};
