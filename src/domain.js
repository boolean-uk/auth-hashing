const registerUserDb = async (username, password) => {

}

const loginUserDb = async (username, password) => {
  const getUser = getUserDb(username)
  if (pass)
}

const getUserDb = async (username) => {
  const foundUser = await prisma.user.findUniqueOrThrow({ 
    where: {
      username
    }
  })
}

module.exports = { registerUserDb, loginUserDb }