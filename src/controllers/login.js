const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { findUserDb } = require('../domains/registrations')
const secret = process.env.JWT_SECRET

const loginUser = async (req, res) => {
    const { username, password } = req.body

    const validUser = await findUserDb(username)
    if (!validUser) return res.status(401).json({ error: "Login details incorrect, please try again"})

    const verifyPassword = await bcrypt.compare(password, validUser.password)
    if (!verifyPassword) return res.status(401).json({ error: "Login details incorrect, please try again"})

    const token = jwt.sign({ username: validUser.username }, secret)
    res.status(201).json({ success: "You have successfully logged in!", token })
}

module.exports = { loginUser }