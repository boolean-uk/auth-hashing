const prisma = require("../utils/prisma");

const getUserByUsername = async (username) => await prisma.user.findUnique({
    where: {
        username: username
    }
})

module.exports = {
    getUserByUsername
}