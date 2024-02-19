const bcrypt = require('bcrypt');
const { registerUserDb, loginUserDb, getUserDb } = require('./domain');
const { hashString } = require('./utils');

const registerUser = async (req, res) => {
  const { username, password } = req.body
	console.log(req.body)
	if (!username || !password) res.status(404).json({ error: "missing fields in body"})

	const userExists = await getUserDb(username)
	console.log(userExists)
	if (userExists) return res.status(404).json({ error: "username is already taken" })

	const user = await registerUserDb(username, password)
	console.log(user)
	if (!user) res.status(404).json({ error: "missing fields in body"})

	return res.status(201).json({ user })
}

const loginUser = async (req, res) => {
  const { username, password } = req.body
	if (!username || !password) res.status(404).json({ error: "missing fields in body"})

	const user = await loginUserDb(username, password)

	if (user === false) res.status(401).json({ error: "invalid login credentials" })

	return res.status(200).json({ user })
}

module.exports = { registerUser, loginUser }
