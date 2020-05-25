const Base = require('./DynamoDbBaseRepository')

function persist (user) {
  const params = {
    TableName: "User",
    Item: user
  }
  return Base.persist(params)
}

function get (email) {
  const params = {
    TableName: "User",
    Key: {
      email: email
    }
  }
  return Base.get(params)
}

module.exports = {
  persist,
  get
}