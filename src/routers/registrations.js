const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../utils/prisma.js')

// Global functions
const checkUserExist = async (username) => {
  const foundUser = await prisma.user.findFirst({
    where: {
      username: username
    }
  })

  if (foundUser) {
    const error = new Error('User with provided username already exist')
    error.status = 409
    throw error
  }

  return true
}

const createUser = async (username, password) => {
  const createdUser = await prisma.user.create({
    data: {
      username: username,
      password: password
    }
  })

  return createdUser
}

// Routers
router.post('/', async (req, res) => {
  const { username, password } = req.body

  // Hash the password: https://github.com/kelektiv/node.bcrypt.js#with-promises
  try {
    await checkUserExist(username)

    const hashPassword = await bcrypt.hash(password, 12)
    const savedUserData = await createUser(username, hashPassword)

    res.status(201).json({ user: savedUserData })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
})

module.exports = router
