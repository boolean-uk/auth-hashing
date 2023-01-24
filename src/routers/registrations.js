const express = require('express')
const router = express.Router()
secret = process.env.JWT_SECRET
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../utils/prisma.js')

router.post('/', async (req, res) => {
  // Get the username and password from request body
  const { username, password } = req.body
  // Hash the password: https://github.com/kelektiv/node.bcrypt.js#with-promises

  const saltRounds = 10

  bcrypt

  // Save the user using the prisma user model, setting their password to the hashed version

  // Respond back to the client with the created users username and id
  res.status(201).json({ user: undefined })
})

module.exports = router
