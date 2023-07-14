const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')

router.post('/', async (req, res) => {
  const { username, password } = req.body

  bcrypt.hash(password, saltRounds, function(err, hash) {
    prisma.user.create({
      data: {
        username,
        password: hash
      }
    })
    .then((user) => {
      return res.status(201).json({ user: { user: user.username, id: user.id } })
    })
  });
});

module.exports = router;
