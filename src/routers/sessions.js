const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");

router.post("/", async (req, res) => {
	// Get the username and password from the request body

	const { username, password } = req.body;

	// Check that a user with that username exists in the database
	// Use bcrypt to check that the provided password matches the hashed password on the user
	// If either of these checks fail, respond with a 401 "Invalid username or password" error

	const user = await prisma.user.findUnique({
		where: {
			username: username,
		},
	});

	if (!user) {
		return res.status(401).json({
			message: "Username is invalid",
		});
	}

	const comparePW = await bcrypt.compare(password, user.password);

	if (!comparePW) {
		res.status(401).json({
			message: "Password is invalid",
		});
	}

	// If the user exists and the passwords match, create a JWT containing the username in the payload
	// Use the JWT_SECRET environment variable for the secret key
	const token = jwt.sign({ username: username }, process.env.JWT_SECRET);

	// Send a JSON object with a "token" key back to the client, the value is the JWT created

	res.status(201).json({
		token,
	});
});

module.exports = router;
