const { GraphQLServer, PubSub } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Vote = require('./resolvers/Vote')
const Faction = require('./resolvers/Faction')
const Race = require('./resolvers/Race')



const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
  Faction,
  Race
}

const prisma = new PrismaClient()
const pubsub = new PubSub()
const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
  resolvers,
  // Pass context when the GraphQLServer is instantiated to access in all resolvers
  // Attach the HTTP request that carries the incoming GraphQL query (or mutation)
  context: request => {
    return {
      ...request,
      prisma,
      pubsub
    }
  },
})

// Open GUI to view DB with: npx prisma studio --experimental

server.start(() => console.log(`Server is running on http://localhost:4000`))
