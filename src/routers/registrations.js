const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");

router.post("/", async (req, res) => {
	const { username, password } = req.body;

	// Hash the password: https://github.com/kelektiv/node.bcrypt.js#with-promises

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 8);
	} catch (err) {
	} finally {
		if (!hashedPassword) {
			return res.status(500).json("oopsie daisy");
		}
	}

	// Save the user using the prisma user model, setting their password to the hashed version

	const user = await prisma.user.create({
		data: {
			username,
			password: hashedPassword,
		},
	});
	// Respond back to the client with the created users username and id

	res.status(201).json({ user: { username: user.username, id: user.id } });
});

module.exports = router;
