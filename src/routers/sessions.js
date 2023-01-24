const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  // Get the username and password from the request body

  // Check that a user with that username exists in the database
  const foundUser = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  if (!foundUser)
    return res.status(404).json({ error: `Username ${username} not found.` });

  // Use bcrypt to check that the provided password matches the hashed password on the user
  bcrypt.compare(password, foundUser.password, (err, correctPwd) => {
    if (!correctPwd)
      // If either of these checks fail, respond with a 401 "Invalid username or password" error
      return res.status(401).json({ error: "Invalid password!" });

    // TODO: CONTINUE BECAUSE PASS IS CORRECt
    // If the user exists and the passwords match, create a JWT containing the username in the payload
    // Use the JWT_SECRET environment variable for the secret key
    // Send a JSON object with a "token" key back to the client, the value is the JWT created
    res.status(200).json({ user: "USER OK" });
  });
});

module.exports = router;
