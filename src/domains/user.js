const prisma = require("../utils/prisma");

const getUserByUsernameDb = async (username) =>
  await prisma.user.findUnique({
    where: { username },
  });

const createUserDb = async (username, password) =>
  await prisma.user.create({
    data: {
      username,
      password,
    },
  });

module.exports = {
  createUserDb,
  getUserByUsernameDb,
};
