# Kuestion -- API
- DynamoDb
- GraphQL
- Nodejs

## How to start
- Download DynamoDb (docker or jar directly)
- Create folder `src/data/dynamodb/instance`
- Copy DynamoDb jar to `src/data/dynamodb/instance`
- Run DynamoDb and init tables
- To run backend on the local there is two option
  - nodejs server
  - offline aws lambda
- Install dependencies
  - `yarn install`

## Init Db
`node src/data/dynamodb/InitTables.js`

## Run local Nodejs
- Run nodejs server
  - `cd api/`
  - `node src/local.js`

## Serverless
- Install Serverless framework (`yarn add serverless -g`)
- Run via Serverless offline
  - `cd api/src/`
  - `sls offline`

### Test Command
curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{ "query": "{ info }" }' \
  https://18nkkf0lz0.execute-api.eu-central-1.amazonaws.com/dev/api