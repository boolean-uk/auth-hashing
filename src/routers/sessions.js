const express = require('express');
const router = express.Router();
const secret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    
    // Get the username and password from the request body

    const session = async ()=>{
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        
        })

        const checkDetails = await bcrypt.compare(password, user.password)
        if(!checkDetails){
            res.status(401).json("Invalid username or password")
        }
        else{
            const payload = {username:username}

            const createToken = (payload, secret)=>{
                const token = jwt.sign(payload, secret);
                return token;
            }

            const generateToken = createToken(payload, secret)

            res.json(generateToken)
            console.log(generateToken)
        }

     
    }

    session()
    // Get the username and password from the request body

    // Check that a user with that username exists in the database
    // Use bcrypt to check that the provided password matches the hashed password on the user
    // If either of these checks fail, respond with a 401 "Invalid username or password" error

    // If the user exists and the passwords match, create a JWT containing the username in the payload
    // Use the JWT_SECRET environment variable for the secret key

    // Send a JSON object with a "token" key back to the client, the value is the JWT created
});

module.exports = router;
