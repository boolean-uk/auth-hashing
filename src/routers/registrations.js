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
    try {
      // Save the user using the prisma user model, setting their password to the hashed version
      const newUser = await prisma.user.create({
        data: {
          username: username,
          password: hashedPwd,
        },
      });

      delete newUser.password;
      // Respond back to the client with the created users username and id
      res.status(201).json({ user: newUser });
    } catch (error) {
      if (error.code === "P2002") {
        res
          .status(403)
          .json({ error: `The username ${username} is already taken!` });
      } else {
        res.status(500).json({ error });
      }
    }
  });
});

module.exports = router;
