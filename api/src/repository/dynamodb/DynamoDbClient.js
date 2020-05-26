const AWS = require('aws-sdk')

if (process.env.IS_OFFLINE) {
  AWS.config.update({
    region: process.env.REGION,
    endpoint: process.env.DYNAMODB_ENDPOINT
  })
}

const docClient = new AWS.DynamoDB.DocumentClient()

module.exports = {
  docClient
}