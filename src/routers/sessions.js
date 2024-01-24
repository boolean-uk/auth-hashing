const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");

const secret = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    console.log(user);

    if (!username) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ username: user.username }, secret);
    res.json({ token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
