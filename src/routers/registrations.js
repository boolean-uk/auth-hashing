const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { json } = require("express");
const prisma = new PrismaClient();
const { User } = require("@prisma/client");
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const salt = 10;
  bcrypt.hash(password, salt, async (err, hashed_pw) => {
    try {
      const newUser = await prisma.user.create({
        data: {
          username: username,
          password: hashed_pw,
        },
      });
      delete newUser.password;
      res.status(201).json({ user: newUser });
    } catch (err) {
      if (err.code === "P2002") {
        res
          .status(403)
          .json({ err: `The username ${username} is already taken` });
      } else {
        res.status(400).json({ error: err });
      }
    }
  });
});

module.exports = router;
