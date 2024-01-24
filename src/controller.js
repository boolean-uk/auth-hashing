const bcrypt = require('bcrypt');
const { registerUserDb, loginUserDb } = require('./domain')

const registerUser = async (req, res) => {
  const { username, password } = req.body

}

const loginUser = async (req, res) => {
  const { username, password } = req.body

}

module.exports = { registerUser, loginUser }