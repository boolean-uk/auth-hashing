const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../utils/prisma.js"); // Make sure this path is correct

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // Get the username and password from request body
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save the user using the prisma user model, setting their password to the hashed version
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    
    // Respond back to the client with the created user's username and id
    res
      .status(201)
      .json({ user: { id: newUser.id, username: newUser.username } });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

module.exports = router;