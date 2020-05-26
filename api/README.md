# Kuestion api
- DynamoDb
- GraphQL
- Nodejs

## Init Db
`node src/data/dynamodb/InitTables.js`

## Serverless

## Test
curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{ "query": "{ info }" }' \
  https://18nkkf0lz0.execute-api.eu-central-1.amazonaws.com/dev/api