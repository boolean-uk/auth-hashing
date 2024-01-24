const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const findUserDb = async (username) => await prisma.user.findUnique({
    where: { username }
})

const createUserDb = async (username, password) => await prisma.user.create({
    data: {
        username,
        password
    }
})

module.exports = { findUserDb, createUserDb }