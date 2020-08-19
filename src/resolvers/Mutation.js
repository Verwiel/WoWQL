const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

// Adheres to the shape of an AuthPayload object from GraphQL schema.
async function signup(parent, args, context, info) {
  // Encrypt password
  const password = await bcrypt.hash(args.password, 10)
  // Use PrismaClient to store new User in DB
  const user = await context.prisma.user.create({ data: { ...args, password } })
  // Generate a JSON Web Token
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  // Use PrismaClient get an existing User record by email address from args
  const user = await context.prisma.user.findOne({ where: { email: args.email } })

  if (!user) {
    throw new Error('No user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

function post(parent, args, context, info) {
  const userId = getUserId(context)

  const newLink = context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    }
  })

  context.pubsub.publish("NEW_LINK", newLink)

  return newLink
}

async function vote(parent, args, context, info) {
  const userId = getUserId(context)

  // Check if vote already exists
  const vote = await context.prisma.vote.findOne({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId: userId
      }
    }
  })

  if (Boolean(vote)) {
    throw new Error(`Already voted for link: ${args.linkId}`)
  }

  const newVote = context.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: Number(args.linkId) } },
    }
  })

  context.pubsub.publish("NEW_VOTE", newVote)

  return newVote
}

module.exports = {
  signup,
  login,
  post,
  vote,
}