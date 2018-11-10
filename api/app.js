"use strict"

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// cargar rutas
var user_routes = require("./routes/user");
var artists_routes = require("./routes/artists");
var album_routes = require("./routes/album");
var song_routes = require("./routes/song");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// configurar cabeceras http
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow", "GET, POST, OPTIONS, PUT, DELETE")
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

    next();
});
// rutas base
app.use("/api", [user_routes, artists_routes, album_routes, song_routes]);

module.exports = app;