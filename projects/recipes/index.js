const http = require('http');
const express = require('express');
// const db = require('./js/database.js');

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
app.use(connectLiveReload()); // part of development for refreshing on change



app.get("/", function(req, res) {
    res.render("home");
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})
