const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");

// const secret = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  // Get the username and password from request body
  try {
    const { username, password } = req.body;

    // Hash the password: https://github.com/kelektiv/node.bcrypt.js#with-promises
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save the user using the prisma user model, setting their password to the hashed version
    const createUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });

    // Respond back to the client with the created users username and id
    res.status(201).json({ user: { username: createUser.username } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
