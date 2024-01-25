const prisma = require("../utils/prisma");
const createUserRegistrationDb = async (username, hashedPassword) => {
    return await prisma.user.create({
      data:{
        username,
        password: hashedPassword
      }
    });
  };
module.exports = { createUserRegistrationDb };
