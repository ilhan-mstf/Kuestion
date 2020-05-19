const Base = require('./DynamoDbBaseRepository')
const { v4: uuidv4 } = require('uuid')

function persist (session) {
  session.id = uuidv4()

  const params = {
    TableName: "Session",
    Item: session
  }
  return Base.persist(params)
}

function get (id) {
  const params = {
    TableName: "Session",
    Key: {
      id: id
    }
  }
  return Base.get(params)
}

function getSessionsOfUser (email) {
  const params = {
    TableName: "Session",
    IndexName: "EmailIndex",
    KeyConditionExpression: "email = :e",
    ExpressionAttributeValues: {
      ":e": email
    }
  }
  return Base.query(params)
}

function update (session) {
  const params = {
    TableName: "Session",
    Key: {
      "id": session.id
    },
    UpdateExpression: "set title=:t, description=:d",
    ExpressionAttributeValues: {
      ":t": session.title,
      ":d": session.description
    },
    ReturnValues:"UPDATED_NEW"
  }
  return Base.update(params)
}

function incrementTotalQuestionCount (id) {
  var params = {
    TableName: "Session",
    Key:{
      "id": id
    },
    UpdateExpression: "set totalQuestionCount = totalQuestionCount + :val",
    ExpressionAttributeValues:{
      ":val": 1
    },
    ReturnValues:"UPDATED_NEW"
  }
  return Base.update(params)
}


function incrementTotalVoteCount (id) {
  var params = {
    TableName: "Session",
    Key:{
      "id": id
    },
    UpdateExpression: "set totalVoteCount = totalVoteCount + :val",
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
  getSessionsOfUser,
  update,
  incrementTotalQuestionCount,
  incrementTotalVoteCount
}