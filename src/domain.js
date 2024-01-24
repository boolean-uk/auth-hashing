const prisma = require("./utils/prisma");

const registerUserDb = async (hashedPassword, username) => {
  return await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  });
};

const findUserDb = async (username) => {
    return await prisma.user.findUnique({
        where: {
           username
        }
    })
};


module.exports = {
  registerUserDb,
  findUserDb
};
