const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const checkUserDB = async (username, password) =>
    await prisma.user.findUnique({
        where: {
            username,
        },
    });

module.exports = {
    checkUserDB,
};
