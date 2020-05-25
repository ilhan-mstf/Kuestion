const AWS = require('aws-sdk');

AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
    TableName: "Test",
    Key:{
        "year": 2015,
        "title": "The Big New Movie"
    }
};

async function get(params) {
  try {
    const data = await docClient.get(params).promise();
    console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    return data
  } catch (err) {
    console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
  }
}

get(params);

/*
docClient.get(params, function(err, data) {
  if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
      console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
  }
});
*/