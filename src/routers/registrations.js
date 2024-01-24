const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()


router.post('/', async (req, res) => {
    const { username, password} = req.body
    console.log(username, password)
}) 

module.exports = router