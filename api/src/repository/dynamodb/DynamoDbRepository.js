const User = require('./DynamoDbUserRepository')
const Session = require('./DynamoDbSessionRepository')
const Question = require('./DynamoDbQuestionRepository')
const Vote = require('./DynamoDbVoteRepository')

module.exports = {
  User,
  Session,
  Question,
  Vote
}