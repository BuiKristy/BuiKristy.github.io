const url = require('./url.js');
var MongoClient = require('mongodb').MongoClient;
var client = new MongoClient(url, { monitorCommands: true });


module.exports = function() {
    client.connect();
    const database = client.db("RecipesDB");
    const collection = database.collection("RecipesCollection");
    console.log("Connected successfully to server");

    return {
        insertRecipe: async function(data) {
            var concatName = data.name.toLowerCase().replaceAll(/[^a-zA-Z0-9 -]/g, "").replaceAll(" ", "-");
            data["page"] = concatName;
        
            data["ingredients"] = data.ingredients.split("\r\n");
            data["instructions"] = data.instructions.split("\r\n");
            data["notes"] = data.notes.split("\r\n");

            const insertResult = await collection.insertOne(data);
            console.log(insertResult);
        },
        findRecipe: async function(name) {
            const findResult = await collection.findOne({page: name});
            return findResult;
        },
        getLatest: async function() {
            const findResult = await collection.find({}).sort( [['_id', -1]] ).limit(10);
            var data = [];
            for await (const item of findResult) {
                data.push(item);
            }
            
            return data;
        },
        getAllByType: async function(type) {
            const projection = {name: 1, page: 1,  image: 1, course: 1, diet: 1, cuisine: 1}
            const findResult = await collection.find({}).project(projection).sort({type: -1 });
            var data = [];
            for await (const item of findResult) {
                data.push(item);
            }
            return data;
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