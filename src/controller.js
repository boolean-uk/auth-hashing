const { registerUserDb, loginUserDb } = require("./domain")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const registerUser = async (req, res) => {
    await registerUserDb()
}
const loginUser = async (req, res) => {
    await loginUserDb()
}

module.exports = {
    registerUser, 
    loginUser
}