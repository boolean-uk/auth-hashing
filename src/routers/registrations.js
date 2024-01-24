const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");

router.post("/", async (req, res) => {
  try {
    // Get the username and password from request body
    const { username, password } = req.body;

    // Hash the password: https://github.com/kelektiv/node.bcrypt.js#with-promises
    const hashedPassword = await bcrypt.hash(password, 12);
    // Save the user using the prisma user model, setting their password to the hashed version
    const createdUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
    // Respond back to the client with the created users username and id
    res.status(201).json({
      user: {
        id: createdUser.id,
        username: createdUser.username,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
