const { GraphQLServerLambda } = require('graphql-yoga')
const Query = require('./resolver/Query')
const Mutation = require('./resolver/Mutation')
const Session = require('./resolver/Session')
const User = require('./resolver/User')
const Question = require('./resolver/Question')
const Vote = require('./resolver/Vote')
const repo = require('./repository/dynamodb/DynamoDbRepository')

const resolvers = {
  Query,
  Mutation,
  Session,
  User,
  Question,
  Vote
}

const lambda = new GraphQLServerLambda({
  typeDefs: './schema.graphql',
  resolvers,
  context: request => {
    return { ...request, repo }
  }
})

exports.server = lambda.graphqlHandler
exports.playground = lambda.playgroundHandler