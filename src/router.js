const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { registerDb, getUserDb } = require("./domains/access");
const router = express.Router();




router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 8);
  try {
  const user = await registerDb(username, hashedPass);
  return res.status(200).json({ user });
  } catch(e) {
    if(e.code === 'P2002') {
      return res.status(400).json({ error: "A user already exists with that name" })
    }
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserDb(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ username: username }, process.env.JWT_SECRET);
      return res.status(200).json({ token });
    }
    return res.status(401).json({ error: "Incorrect password" });
  } catch (e) {
    return res.status(401).json({ error: "No user found with that username" });
  }
});

module.exports = router;
