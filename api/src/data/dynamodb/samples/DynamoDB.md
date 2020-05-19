# Commands
## Jar command
`java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb`

## Docker
`sudo docker pull amazon/dynamodb-local`
`sudo docker run -p 8000:8000 amazon/dynamodb-local`
`sudo docker run -p 8000:8000 -v $(pwd)/local/dynamodb:/data/ amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb -dbPath /data`

## Connect with AWS CLI
`aws dynamodb list-tables --endpoint-url http://localhost:8000 --region local`

## NoSQL Workbench

## AWS node sdk
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.02.html
