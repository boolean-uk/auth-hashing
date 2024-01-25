const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { registerUser, loginUser } = require('./controller');
const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;
