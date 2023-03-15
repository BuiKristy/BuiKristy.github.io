const express = require('express');
const fileUpload = require('express-fileupload');
const db = require('./js/database.js')();
const login = require('./js/pass.js');

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
app.use(fileUpload());
app.use(connectLiveReload()); // part of development for refreshing on change

app.get("/", async (req, res) => {
    const data = await db.getLatest();
    res.render("home", {data: data});
});

app.get("/recipes/:name", async (req, res) => {
    try {
        const data = await db.findRecipe(req.params.name);
        res.render("recipe", {data: data});
    } catch(err) {
        console.log(err);
        res.render("errorPage");
    }
});

app.get("/recipe_index", async (req, res) => {
    try {
        const data = await db.getLatest();
        res.render("recipeIndex", {data: data});
    } catch(err) {
        console.log(err);
        res.render("errorPage");
    }
});

app.get("/collection/:name_index", async (req, res) => {
    try {
        if(req.params.name_index === "cuisine_index") {
            const data = await db.getAllByType("cuisine");
            res.render("indexByType", groupByType(data, "cuisine"));
        } else if(req.params.name_index === "diet_index") {
            const data = await db.getAllByType("diet");
            res.render("indexByType", groupByType(data, "diet"));
        } else if(req.params.name_index === "course_index") {
            const data = await db.getAllByType("course");
            res.render("indexByType", groupByType(data, "course"));
        } else {
            throw new URIError();
        }
    } catch(err) {
        console.log(err);
        res.render("errorPage");
    }
});

app.get("/add_recipe", (req, res) => {

    const reject = () => {
        res.setHeader("www-authenticate", "Basic");
        res.status(401).send('Authentication required.')
    };

    const authorization = req.headers.authorization;

    if (!authorization) {
        return reject();
    }

    const [username, password] = Buffer.from(authorization.replace("Basic ", ""), "base64").toString().split(":");

    if (!(username === login.username && password === login.password)) {
        return reject();
    }
    
  // Access granted...
  res.render('addRecipe');
});

app.post("/add_recipe", (req, res) => {
    const {image} = req.files;
    if (!image) return res.status(400).send("No image was selected."); // if no image submitted
    if (!/^image/.test(image.mimetype)) return res.status(400).send("No mimetype detected."); // if image does not have mimetype

    var recipe = req.body;
    recipe["image"] = image.name;
    
    console.log("adding recipe...");
    db.insertRecipe(recipe);
    console.log(recipe);
    image.mv(__dirname + '/img/food/' + image.name);
    res.sendStatus(200);
})



app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})


function groupByType(data, type) {
    const types = new Set();
    for(var i = 0; i < data.length; i++) {
        types.add(data[i][type]);
    }

    return {typeName: type, types: types, data: data}
}