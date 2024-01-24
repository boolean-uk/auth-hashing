const express = require("express");
const router = express.Router();
const { PrismaClientKnownRequestError } = require("@prisma/client");

const bcrypt = require("bcrypt");
const prisma = require("../utils/prisma.js");

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(406)
        .json({ error: "Both username and password required" });
    }

    const existingUsername = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUsername) {
      return res.status(409).json({ error: "Username already exists" });
    }

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
    res.status(500).json({ error: "Internal Error" });
  }
});

module.exports = router;
