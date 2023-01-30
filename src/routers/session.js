const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { json } = require("express");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password!" });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (!result) {
      return res.status(401).json({ error: "Invalid username or password!" });
    } else {
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign({ sub: user.id, username: user.username }, secret);

      res.status(201).json({ token });
    }
  });
});
module.exports = router;
