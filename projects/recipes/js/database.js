import url from "./url.js";
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var client = new MongoClient(url, { monitorCommands: true });
// client.on('commandStarted', (event) => console.debug(event));
// client.on('commandSucceeded', (event) => console.debug(event));
// client.on('commandFailed', (event) => console.debug(event));

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Establish and verify connection
        // await client.db("SampleDB").command({ ping: 1 });
        
        ////////////////////// test code
        const database = client.db("SampleDB");
        const collection = database.collection("SampleCollection");

        const findResult =  await collection.findOne({"test": "test"});

        console.log(findResult);

        ///////////////////////
        
        console.log("Connected successfully to server");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);