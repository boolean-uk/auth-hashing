const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");
const saltRounds = 11;

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  
  const hash = await bcrypt.hash(password, saltRounds);
  const user = await prisma.user.create({
    data: {
      username: username,
      password: hash,
    },
  });

  res.status(201).json({ user: user, status: "success" });
});

module.exports = router;
