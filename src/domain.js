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
  const hashedPassword = await hashString(password)

  try {
		const foundUser = await prisma.user.findUniqueOrThrow({
      where: {
        username
      }
    })

		if (await compareStrings(password, foundUser.password)) {
    	return foundUser
		} else {
			throw Error
		}
  } catch (error) {
		return false
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
