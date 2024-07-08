const { getUserByUsername } = require("../domain/user")

const getUser = async (req, res) => {
    const { username, password } = req.body

    const found = await getUserByUsername(username)
    return found
}

module.exports = {
    getUser
}