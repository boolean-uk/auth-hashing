const express = require("express");

const { registerUser } = require("./controller/register.controller");
const { loginUser } = require("./controller/login.controller");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
