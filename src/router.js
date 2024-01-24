const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { registerUser, loginUser } = require('./controller') 

const router = express.Router();

router.post('/register', async (req, res) => {
    
});

router.post('/login', async (req, res) => {
    
});

module.exports = router;
