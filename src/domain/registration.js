const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUserDB = async (username, hash) => {
    const newUser = await prisma.user.create({
        data: {
            username,
            password: hash,
        },
        select: {
            username: true,
            password: true,
        },
    });

    return newUser;
};

module.exports = {
    createUserDB,
};
