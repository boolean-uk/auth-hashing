const express = require('express');

const { register } = require('../controllers/registration.js')

const router = express.Router();

router.post('/', register)

module.exports = router