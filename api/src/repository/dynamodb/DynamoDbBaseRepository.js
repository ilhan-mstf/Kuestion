const Client = require('./DynamoDbClient')

async function get (params) {
  try {
    const data = await Client.docClient.get(params).promise()
    console.log("GetItem succeeded:", JSON.stringify(data, null, 2))
    return data.Item
  } catch (err) {
    console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2))
    throw new Error("Unable to read item")
  }
}

async function persist (params) {
  try {
    const data = await Client.docClient.put(params).promise()
    console.log("Added item:", JSON.stringify(data, null, 2))
    return params.Item
  } catch (err) {
    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2))
    throw new Error("Unable to add item")
  }
}

async function update (params) {
  try {
    const data = await Client.docClient.update(params).promise()
    console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2))
    return params.Item
  } catch (err) {
    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2))
    throw new Error("Unable to update item")
  }
}

async function scan (params) {
  try {
    const data = await Client.docClient.scan(params).promise()
    console.log("Scan result:", JSON.stringify(data, null, 2))
    return data.Items
  } catch (err) {
    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    throw new Error("Unable to scan the table")
  }
}

async function query (params) {
  console.log(params)
  try {
    const data = await Client.docClient.query(params).promise()
    console.log("Query result:", JSON.stringify(data, null, 2))
    return data.Items
  } catch (err) {
    console.error("Unable to query the table. Error JSON:", JSON.stringify(err, null, 2));
    throw new Error("Unable to query the table")
  }
}

module.exports = {
  get,
  persist,
  update,
  scan,
  query
}