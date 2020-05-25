const Base = require('./DynamoDbBaseRepository')

function persist (vote) {
  vote.questionIdEmail = `${vote.questionId}-${vote.email}`
  vote.sessionIdEmail = `${vote.sessionId}-${vote.email}`

  const params = {
    TableName: "Vote",
    Item: vote
  }
  return Base.persist(params)
}

function get (questionId, email) {
  const params = {
    TableName: "Vote",
    Key: {
      questionIdEmail: `${questionId}-${email}`
    }
  }
  return Base.get(params)
}

function getSessionVotesOfCurrentUser (sessionId, userId) {
  const sessionIdEmail = `${vote.sessionId}-${vote.email}`

  const params = {
    TableName: "Vote",
    IndexName: "SessionIdEmailIndex",
    KeyConditionExpression: "sessionIdEmail = :sie",
    ExpressionAttributeValues: {
      ":sie": sessionIdEmail
    }
  }
  return Base.query(params)
}

module.exports = {
  persist,
  get,
  getSessionVotesOfCurrentUser
}