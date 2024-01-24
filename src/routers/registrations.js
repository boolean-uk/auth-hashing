const express = require('express')
const { registerUser } = require('../controllers/registrations.js');
const router = express.Router()

router.post('/', registerUser)
   
module.exports = router