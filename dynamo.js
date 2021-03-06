const AWS = require('aws-sdk');
require('dotenv').config();
// console.log(process.env);
AWS.config.update({
    maxRetries: 3,
    httpOptions: { timeout: 5000 },
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyID: process.env.AWS_ACCES_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "harrypotter-api";


const getCharacters = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    const characters = await dynamoClient.scan(params).promise();
    console.log(characters);
    return characters;
};

const getCharacterById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
        }
    }
    return await dynamoClient.get(params).promise();
};

const addOrUpdateCharacter = async (character) => {
    const params = {
        TableName: TABLE_NAME,
        Item: character
    } 
    return await dynamoClient.put(params).promise();
};

const deleteCharacterById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
        }
    }
    return await dynamoClient.delete(params).promise();
};


module.exports = {
    dynamoClient,
    getCharacters,
    getCharacterById,
    addOrUpdateCharacter,
    deleteCharacterById
}
