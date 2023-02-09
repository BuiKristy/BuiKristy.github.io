const http = require('http');
const express = require('express');
// const db = require('./js/database.js');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("css"));


app.get("/", function(req, res) {
    res.render("home");
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})
