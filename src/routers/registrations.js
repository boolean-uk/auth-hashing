const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js');
const { getUser } = require('../controllers/user.js');
const { getUserByUsername } = require('../domain/user.js');

router.post('/', async (req, res) => {
    // Get the username and password from request body
    const { username, password } = req.body
    if(username.length < 5) {
        return res.status(400).json({
            error: 'The username provided does not meet requirements'
        })
    }
    if(password.length < 8) {
        return res.status(400).json({
            error: 'Password must be 8 characters or longer'
        })
    }
    const found = await getUserByUsername(username)
    if(found) {
        return res.status(409).json({
            error: "A user with that username already exists"
        })
    }
    // Hash the password: https://github.com/kelektiv/node.bcrypt.js#with-promises
    const hshPassword = await bcrypt.hash(password, 8)
    // Save the user using the prisma user model, setting their password to the hashed version
    const createdUser = await prisma.user.create({
        data: {
            username: username,
            password: hshPassword
        }
    })
    const {id} = createdUser
    const response = {id, username}
    // Respond back to the client with the created users username and id
    res.status(201).json({ user: response })
});

module.exports = router;
