const { GraphQLServer } = require('graphql-yoga')
const Query = require('./resolver/Query')
const Mutation = require('./resolver/Mutation')
const Session = require('./resolver/Session')
const User = require('./resolver/User')
const Question = require('./resolver/Question')
const Vote = require('./resolver/Vote')

const resolvers = {
  Query,
  Mutation,
  Session,
  User,
  Question,
  Vote
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return { ...request }
  }
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
