const Base = require('./DynamoDbBaseRepository')
const { v4: uuidv4 } = require('uuid')

function persist (question) {
  question.id = uuidv4()

  const params = {
    TableName: "Question",
    Item: question
  }
  return Base.persist(params)
}

function get (id) {
  const params = {
    TableName: "Question",
    Key: {
      id: id
    }
  }
  return Base.get(params)
}

function getQuestionsOfSession (sessionId) {
  const params = {
    TableName: "Question",
    IndexName: "SessionIdIndex",
    KeyConditionExpression: "sessionId = :s",
    ExpressionAttributeValues: {
      ":s": sessionId
    }
  }
  return Base.query(params)
}

function incrementVoteCount (id) {
  var params = {
    TableName: "Question",
    Key:{
      "id": id
    },
    UpdateExpression: "set voteCount = voteCount + :val",
    ExpressionAttributeValues:{
      ":val": 1
    },
    ReturnValues:"UPDATED_NEW"
  }
  return Base.update(params)
}

module.exports = {
  persist,
  get,
  getQuestionsOfSession,
  incrementVoteCount
}