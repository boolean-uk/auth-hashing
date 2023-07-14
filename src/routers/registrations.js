const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')

router.post('/', async (req, res) => {
  console.log(req.body)
  const { username, password } = req.body

  bcrypt.hash(password, saltRounds, function(err, hash) {
    try {
      prisma.user.create({
        data: {
          username,
          password: hash
        }
      })
      .then((user) => {
          const token = jwt.sign(username, process.env.JWT_SECRET)
          return res.status(201).json({ user: { user: user.username, id: user.id }, message: "new user created", token })
    })
    } catch (error) {
        return res.status(401).json({  message: "user already exists"})
    }
  });
});

module.exports = router;
