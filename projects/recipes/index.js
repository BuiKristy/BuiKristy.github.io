const http = require('http');
const express = require('express');
const fs = require('fs').promises;
const db = require('./js/database.js')();

// this is for refreshing the browser on changes
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
///////////

const hostname = '127.0.0.1';
const port = 3000;

const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("css"));
app.use(express.static("img"));
app.use(express.static("fonts"));
app.use(express.static("recipes"));
app.use(connectLiveReload()); // part of development for refreshing on change



app.get("/", function (req, res) {
    res.render("home");
});

app.get("/recipes/:name", async function (req, res) {
    try {
        const data = await fs.readFile(`./recipes/${req.params.name}.json`);
        res.render("recipe", {data: JSON.parse(data)});
    } catch(err) {
        console.log(err);
        res.render("errorPage");
    }
});

app.get("/recipe_index", async function(req, res){
    try {
        const data = await fs.readFile(`./recipes/index.json`);
        res.render("recipeIndex", {data: JSON.parse(data)});
    } catch(err) {
        console.log(err);
        res.render("errorPage");
    }
});

app.get("/collection/:name_index", async function(req, res) {
    try {
        if(req.params.name_index === "cuisine_index") {
            const data = await fs.readFile(`./recipes/index.json`);
            res.render("indexByType", groupByType(data, "cuisine"));
        } else if(req.params.name_index === "diet_index") {
            const data = await fs.readFile(`./recipes/index.json`);
            res.render("indexByType", groupByType(data, "diet"));
        } else if(req.params.name_index === "course_index") {
            const data = await fs.readFile(`./recipes/index.json`);
            res.render("indexByType", groupByType(data, "course"));
        } else {
            throw new URIError();
        }
    } catch(err) {
        console.log(err);
        res.render("errorPage");
    }
});

app.get("/add_recipe", function(req, res) {

    const reject = () => {
        res.setHeader("www-authenticate", "Basic");
        res.status(401).send('Authentication required.')
    };

    const authorization = req.headers.authorization;

    if (!authorization) {
        return reject();
    }

    const [username, password] = Buffer.from(authorization.replace("Basic ", ""), "base64").toString().split(":");

    if (!(username === "admin" && password === "eW91cmxvZ2luOnlvdXJwYXNzd29yZA=")) {
        return reject();
    }
    
  // Access granted...
  res.render('addRecipe');
});



app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})


function groupByType(data, type) {
    data = JSON.parse(data);
    const types = new Set();
    for(var i = 0; i < data[0].length; i++) {
        types.add(data[0][i][type]);
    }

    return {typeName: type, types: types, data: data[0]}
}