const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js');

router.post('/', async (req, res) => {
    try {
        // Get the username and password from request body
        const { username, password } = req.body;

        // Validate input data
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Generate a salt and hash the password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the user using the prisma user model, setting their password to the hashed version
        const createdUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        // Create a JWT token for the user (optional, depending on your authentication strategy)
        const token = jwt.sign({ userId: createdUser.id, username: createdUser.username }, 'your-secret-key', {
            expiresIn: '1h', // Set an expiration time for the token
        });

        // Respond back to the client with the created user's username and id
        res.status(201).json({ user: { id: createdUser.id, username: createdUser.username }, token });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;