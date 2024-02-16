const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { hashString, saltString, compareStrings } = require('./utils')

const registerUserDb = async (username, password) => {
	const user = await prisma.user.create({
		data: {
			username,
			password: await hashString(password)
		}
	})
	return user
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

module.exports = { registerUserDb, loginUserDb, getUserDb }
