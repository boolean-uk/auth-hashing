const { registerUserDb, findUserDb } = require("./domain")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(400).json("missing input")
        return
    }
    //no need to await?
    const hashedPassword = bcrypt.hashSync(password, 12)
    const registeredUser = await registerUserDb(hashedPassword, username)

    res.status(201).json({ registeredUser })
}

const loginUser = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(400).json({error: "missing input"})
        return
    }
    let foundUser 
    try {
        foundUser = await findUserDb(username)
    } catch (e) {
        console.log(e)
        res.status(401).json({error: "username/password does not match the records"})
        return
    }
    
    try {
        await bcrypt.compare(password, foundUser.password)
        const token = jwt.sign(username, process.env.SECRET)
        res.status(201).json({ token: token})
    } catch (e) {
        res.status(401).json({error: "username/password does not match the records"})
        return
    }
}

module.exports = {
    registerUser, 
    loginUser
}