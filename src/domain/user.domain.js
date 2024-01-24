const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createUser(username, password) {
  const newUser = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });

  return newUser;
}

async function selectUser(username) {
  const foundUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  
  return foundUser;
}

module.exports = {
  createUser,
  selectUser,
};
