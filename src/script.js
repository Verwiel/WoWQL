const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

// Send queries to the database. All queries inside this function
async function main() {
  const newLink = await prisma.link.create({
    data: {
      description: 'fullstack graphql test',
      url: 'www.test.com'
    }
  })
  const allLinks = await prisma.link.findMany()
  console.log(allLinks)
}

// Close the database connections when the script terminates
main()
  .catch(err => {
    throw err
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
