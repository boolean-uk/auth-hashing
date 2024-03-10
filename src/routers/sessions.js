const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js');

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check that a user with that username exists in the database
        const existingUser = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (!existingUser) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Use bcrypt to check that the provided password matches the hashed password on the user
        const matched = await bcrypt.compare(password, existingUser.password);

        if (!matched) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // If the user exists and the passwords match, create a JWT containing the username in the payload
        const token = jwt.sign({ userId: existingUser.id, username: existingUser.username }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Set an expiration time for the token
        });

        // Send a JSON object with a "token" key back to the client, the value is the JWT created
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
