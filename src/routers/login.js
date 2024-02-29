const express = require('express');
const {
    loginHandler
} = require("../controllers/login.js")

const router = express.Router();

router.post('/', loginHandler);


module.exports = router;
