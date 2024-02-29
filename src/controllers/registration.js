const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClientKnownRequestError } = require("@prisma/client");
const secret = process.env.JWT_SECRET;

const { createUserDB } = require("../domain/registration.js");

const register = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    if (!username || !password)
        return res
            .status(401)
            .json({ error: "Please enter both username and password" });

    const hash = await bcrypt.hash(password, 12);
    // console.log(hash);

    try {
        const createdUser = await createUserDB(username, hash);
        const token = jwt.sign(username, secret);
        console.log(createdUser, token);
        res.status(201).json({ user: createdUser, token: token });
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return res.status(409).json({
                    error: "A user with the provided username already exists",
                });
            }
            res.status(500).json({ error: err.message && err.code });
        }
    }
};


module.exports = {
    register,
};
