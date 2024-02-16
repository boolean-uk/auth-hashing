const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const { hashString } = require("../src/utils");

const seed = async () => {

	const user = await prisma.user.create({
		data: {
			username: "Ally",
			password: await hashString("Test")
		}
	})

	console.log(user)
}

seed()
