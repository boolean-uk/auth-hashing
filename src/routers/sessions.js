const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js');
const { getUserByUsername } = require('../domain/user.js');
const privateKey = process.env.JWT_SECRET

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    // Get the username and password from the request body

    // Check that a user with that username exists in the database
    const found = await getUserByUsername(username)

    // const getByUsername = async (username) => await prisma.user.findUnique({
    //     where: {
    //         username: username
    //     }
    // })
    // const storedPW = await getByUsername(username)

    const checkPW = await bcrypt.compare(password, found.password)
    // Use bcrypt to check that the provided password matches the hashed password on the user
    // If either of these checks fail, respond with a 401 "Invalid username or password" error
    if(!found || !checkPW) {
        return res.status(401).json({
            error: "Invalid username or password"
        })
    }

    // If the user exists and the passwords match, create a JWT containing the username in the payload
    // Use the JWT_SECRET environment variable for the secret key
    const token = jwt.sign(username, privateKey)
    // Send a JSON object with a "token" key back to the client, the value is the JWT created
    res.status(201).json({
        user: token
    })
});

module.exports = router;
