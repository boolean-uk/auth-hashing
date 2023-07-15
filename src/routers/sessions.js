const express = require("express");
const router = express.Router();
const secret = process.env.JWT_SECRET;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { username: username },
    select: { password: true },
  });
  const createToken = (payload, secret) => {
    const token = jwt.sign(payload, secret);
    return token;
  };

  function hasAccess(result) {
    if (result) {
      console.log("Access Granted!");
      const payload = { username, password };
      const myToken = createToken(payload, secret);
      return res
        .status(200)
        .json({ status: "success", data: { token: myToken, user: username } });
    } else {
      console.log("Access Denied!");
      return res.status(401).json({ error: "Invalid username or password" });
    }
  }
  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      hasAccess(result);
    });
  }
});

module.exports = router;
