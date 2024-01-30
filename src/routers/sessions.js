const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");

router.post("/", async (req, res) => {
  try {
    const userData = req.body;

    const foundUser = await prisma.user.findUnique({
      where: { username: userData.username },
    });

    if (!foundUser || !(await bcrypt.compare(userData.password, foundUser.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ username: foundUser.username }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

