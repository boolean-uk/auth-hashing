const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const { findUserDb, createUserDb } = require('../domains/registrations.js')

const registerUser = async (req, res) => {
    const { username, password} = req.body

    const userExists = await findUserDb(username)
    if (userExists) return res.status(409).json({ error: "This username is already in use" })

    const hashedPassword = await bcrypt.hash(password, 12)

    try {
        const newUser = await createUserDb(username, hashedPassword)
        console.log(newUser)
    }
    catch {
        return res.status(500).json({ error: "Server error, please try again" })
    }

}

module.exports = { registerUser }