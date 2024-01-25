const { hashString, saltString, compareStrings } = require('./utils')

const registerUserDb = async (username, password) => {

}

const loginUserDb = async (username, password) => {
  const getUser = getUserDb(username)

  if (!getUser) res.status(409).json({ error: 'username or password incorrect' })

  const hashedPassword = hashString(password)

  try {
    
  } catch (error) {

  }
}

const getUserDb = async (username) => {

  try {
    const foundUser = await prisma.user.findUniqueOrThrow({ 
      where: {
        username
      }
    })
    
    return foundUser
  } catch (error) {

  }
}

module.exports = { registerUserDb, loginUserDb }