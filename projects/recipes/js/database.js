const url = require('./url.js');
var MongoClient = require('mongodb').MongoClient;
var client = new MongoClient(url, { monitorCommands: true });


module.exports = function() {
    // await client.connect();
    const database = client.db("RecipesDB");
    const collection = database.collection("RecipesCollection");
    console.log("Connected successfully to server");

    return {
        insertTest: async function() {
            const insertResult = await collection.insertOne({"test2": "hello2!"});
            console.log(insertResult);
        }
    }
}





// async function run() {
//     try {
//         await client.connect();
        
//         ////////////////////// test code
//         const database = client.db("RecipesDB");
//         const collection = database.collection("RecipesCollection");

//         const findResult = await collection.find({"test": "test"});

//         ///////////////////////
        
//         console.log("Connected successfully to server");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);