const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')

const secret = process.env.JWT_SECRET

router.post('/', async (req, res) => {
    // Get the username and password from the request body
    const { username, password } = req.body;

    // Check that a user with that username exists in the database
    const user = await prisma.user.findUnique({
        where: { username }
    })

    if (!user) {
        res.status(401).json({error: 'invalid credentials'})
    }

    // Use bcrypt to check that the provided password matches the hashed password on the user
    // If either of these checks fail, respond with a 401 "Invalid username or password" error
    const comparePassword = await bcrypt.compare(password, user.password)

    if (!comparePassword) {
        res.status(401).json({error: 'invalid credentials'})
    }

    // If the user exists and the passwords match, create a JWT containing the username in the payload
    // Use the JWT_SECRET environment variable for the secret key
    const token = jwt.sign({ username }, secret)

    // Send a JSON object with a "token" key back to the client, the value is the JWT created
    res.status(201).json({ token })
});

module.exports = router;