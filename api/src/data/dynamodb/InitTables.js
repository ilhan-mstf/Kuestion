const AWS = require('aws-sdk')

AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000"
})

const dynamodb = new AWS.DynamoDB()

const tables = [{
  TableName : "User",
  KeySchema: [
      { AttributeName: "email", KeyType: "HASH" }
  ],
  AttributeDefinitions: [
      { AttributeName: "email", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
      ReadCapacityUnits: 1, 
      WriteCapacityUnits: 1
  }
}, {
  TableName : "Session",
  KeySchema: [
      { AttributeName: "id", KeyType: "HASH" }
  ],
  AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "S" },
      { AttributeName: "email", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
      ReadCapacityUnits: 1, 
      WriteCapacityUnits: 1
  },
  GlobalSecondaryIndexes: [{
    IndexName: "EmailIndex",
    KeySchema: [{
      AttributeName: "email",
      KeyType: "HASH"
    }],
    Projection: {
      ProjectionType: "ALL"
    },
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  }]
}, {
  TableName : "Question",
  KeySchema: [
      { AttributeName: "id", KeyType: "HASH" },
  ],
  AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "S" },
      { AttributeName: "sessionId", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
      ReadCapacityUnits: 1, 
      WriteCapacityUnits: 1
  },
  GlobalSecondaryIndexes: [{
    IndexName: "SessionIdIndex",
    KeySchema: [{
      AttributeName: "sessionId",
      KeyType: "HASH"
    }],
    Projection: {
      ProjectionType: "ALL"
    },
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  }]
}, {
  TableName : "Vote",
  KeySchema: [
      { AttributeName: "questionIdEmail", KeyType: "HASH" }
  ],
  AttributeDefinitions: [
      { AttributeName: "questionIdEmail", AttributeType: "S" },
      { AttributeName: "sessionIdEmail", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
      ReadCapacityUnits: 1, 
      WriteCapacityUnits: 1
  },
  GlobalSecondaryIndexes: [{
    IndexName: "SessionIdEmailIndex",
    KeySchema: [{
      AttributeName: "sessionIdEmail",
      KeyType: "HASH"
    }],
    Projection: {
      ProjectionType: "ALL"
    },
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  }]
}]

tables.forEach(table => {
  dynamodb.createTable(table, function(err, data) {
    if (err) {
      console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
  })
})
