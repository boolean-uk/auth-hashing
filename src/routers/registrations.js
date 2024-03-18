const express = require("express");
const router = express.Router();
const { PrismaClientKnownRequestError } = require("@prisma/client");

const bcrypt = require("bcrypt");
const prisma = require("../utils/prisma.js");

router.post("/", async function createUser(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(406)
        .json({ error: "Both username and password required" });
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createUser = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    res.status(201).json({ user: { username: createUser.username } });
  } catch (error) {
    res.status(500).json({ error: "Internal Error" });
  }
});

module.exports = router;
