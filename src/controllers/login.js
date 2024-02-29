const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { checkUserDB } = require("../domain/login.js");
const secret = process.env.JWT_SECRET;

const loginHandler = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(401)
            .json({ error: "Please enter both username and password" });
    }

    let foundUser;

    try {
        foundUser = await checkUserDB(username);
    } catch (err) {
        res.status(401).json({ error: "Email or password does not match" });
        return;
    }

    const comparePass = await bcrypt.compare(password, foundUser.password);

    if (!comparePass) {
        return res
            .status(401)
            .json({ error: "Email or password does not match" });
    }
    
    const token = jwt.sign(username, secret);
    res.status(201).json({ token: token });
};

module.exports = {
    loginHandler,
};
