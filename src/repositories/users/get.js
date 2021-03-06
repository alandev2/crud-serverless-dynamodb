const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const main = async () => {
  const { dynamodb } = main.dependencies();

  const params = {
    TableName: process.env.DYNAMODB_TABLE_USERS,
    ProjectionExpression: "id, email, #name, created_at, updated_at",
    ExpressionAttributeNames: {
      "#name": "name"
    }
  }

  const { Items: users } = await dynamodb.scan(params).promise()

  return users;
}

main.dependencies = () => ({
  dynamodb
})

module.exports = main;
