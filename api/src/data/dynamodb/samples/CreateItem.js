const AWS = require('aws-sdk');

AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
    TableName: "Test",
    Item:{
        "year": 2018,
        "title": "The Big New Movie",
        "info":{
            "plot": "Nothing happens at all.",
            "rating": 0
        }
    }
};

console.log("Adding a new item...");

async function persist (params) {
    try {
        const data = await docClient.put(params).promise()
        console.log("Added item:", JSON.stringify(data, null, 2));
        return data
    } catch (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    }
}

persist(params);

/*
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});
*/