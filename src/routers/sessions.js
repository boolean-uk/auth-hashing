const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../utils/prisma.js')

const secret = process.env.JWT_SECRET

// Global functions
const loginErrorHandler = () => {
  const error = new Error('Invalid username or password')
  error.status = 401
  return error
}

const getUserByUserName = async (username) => {
  const foundUser = await prisma.user.findFirst({
    where: {
      username: username
    }
  })

  if (!foundUser) {
    throw loginErrorHandler()
  }

  return foundUser
}

const checkPassword = async (password, hashPassword) => {
  const checkedPassword = await bcrypt.compare(password, hashPassword)

  if (!checkedPassword) {
    throw loginErrorHandler()
  }

  return checkPassword
}

// Routers
router.post('/', async (req, res) => {
  const { username, password } = req.body

  try {
    const foundUser = await getUserByUserName(username)

    await checkPassword(password, foundUser.password)

    const createdToken = jwt.sign({ username: foundUser.username }, secret)

    res.status(201).json({ token: createdToken })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
})

module.exports = router
