const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const prisma = require('../utils/prisma.js')

router.post('/', async (req, res) => {
    try{
        const {username, password } = req.body
        const hashedPassword =await bcrypt.hash(password, 12)
        const newUser = await prisma.user.create({
            data: {
              username,
              password: hashedPassword,
            },
          });
          res
          .status(201)
          .json({ user: { id: newUser.id, username: newUser.username } });
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user" });
      }

    res.status(201).json({ user: undefined })
});

module.exports = router;
