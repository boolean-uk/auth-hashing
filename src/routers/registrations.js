const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");
const saltRounds = 11;

router.post("/", async (req, res) => {
  // Get the username and password from request body
  const { username, password } = req.body;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      console.log(hash);

      const updatePassword = prisma.user.update({
        where: { username: username },
        data: {
          password: hash,
        },
      });
    });
  });
  // Hash the password: https://github.com/kelektiv/node.bcrypt.js#with-promises

  // Store hash in your password DB.

  // Save the user using the prisma user model, setting their password to the hashed version

  // Respond back to the client with the created users username and id
  res.status(201).json({ user: undefined, status: "success" });
});

module.exports = router;
