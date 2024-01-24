const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { createUserRegistrationDb } = require("../domain/UserDB.js");


router.post("/", async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const userInfo = await createUserRegistrationDb(username, hashedPassword);
      res.status(201).json({ user: userInfo });
    } catch (error) {
      console.error("Error during user registration:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  

  // Hash the password: https://github.com/kelektiv/node.bcrypt.js#with-promises

  // Save the user using the prisma user model, setting their password to the hashed version

  // Respond back to the client with the created users username and id
});

module.exports = router;
