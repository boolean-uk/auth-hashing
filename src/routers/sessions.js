const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')

const secret = process.env.JWT_SECRET

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    // Get the username and password from the request body

    const userCheck = await prisma.user.findUnique({
        where: {
            username: username
        },
    })

    if (userCheck) {
        bcrypt.compare(password, userCheck.password, function(err, result) {
            console.log(result)

            const token = jwt.sign({username: username}, secret)

            res.json({token})
        })
    } else {
        return res.status(401).send("incorrect username or password")
    }



    // Check that a user with that username exists in the database

    // Use bcrypt to check that the provided password matches the hashed password on the user
    // If either of these checks fail, respond with a 401 "Invalid username or password" error

    // If the user exists and the passwords match, create a JWT containing the username in the payload
    // Use the JWT_SECRET environment variable for the secret key

    // Send a JSON object with a "token" key back to the client, the value is the JWT created
});

module.exports = router;
