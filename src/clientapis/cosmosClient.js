const {CosmosClient}  = require('@azure/cosmos');
const {COSMOS_ENDPOINT,COSMOS_KEY} = require('../config/server.config');


const databaseId = "logging-store";
const containerId = "error-logs";

const client = new CosmosClient({COSMOS_ENDPOINT,COSMOS_KEY});
const database = client.database(databaseId);
const container = database.container(containerId);

// add function 

async function logToCosmosDB(level,message){
    try {
        await container.items.create({
            timeStamp : new Date().toISOString(),
            level : level,
            message : message
        });

        console.log("Entry Created for logs in Cosmos DB");
    } catch (error) {
        console.log("Error logging in Cosmos DB");
    }
};

module.exports = {logToCosmosDB};