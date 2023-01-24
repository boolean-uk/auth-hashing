const express = require("express");
const router = express.Router();
secret = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  // Hash the password: https://github.com/kelektiv/node.bcrypt.js#with-promises

  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, async (err, hashedPwd) => {
    console.log("inside hash");
    try {
      console.log("trying to create user");
      // Save the user using the prisma user model, setting their password to the hashed version
      const newUser = await prisma.user.create({
        data: {
          username: username,
          password: hashedPwd,
        },
      });

      delete newUser.password;
      // Respond back to the client with the created users username and id
      console.log("hashed pass deleted from newUser: ", newUser);
      res.status(204).json({ user: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message, erro_code: error.code });
    }
  });
});

module.exports = router;
