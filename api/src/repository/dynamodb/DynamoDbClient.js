const AWS = require('aws-sdk')

AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000"
})

const docClient = new AWS.DynamoDB.DocumentClient()

module.exports = {
  docClient
}