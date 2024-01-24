const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");
const secret = process.env.JWT_SECRET;
router.post("/", async (req, res) => {
  try {
    // Get the username and password from the request body
    const { username, password } = req.body;
    // Check that a user with that username exists in the database
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      // If the user does not exist, respond with a 401 "Invalid username or password" error
      return res.status(401).json({ error: "Invalid username or password" });
    }
    // Use bcrypt to check that the provided password matches the hashed password on the user
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      // If the passwords do not match, respond with a 401 "Invalid username or password" error
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // If the user exists and the passwords match, create a JWT containing the username in the payload
    const token = jwt.sign({ username: user.username }, secret);

    // Send a JSON object with a "token" key back to the client, the value is the JWT created
    res.json({ token: token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
