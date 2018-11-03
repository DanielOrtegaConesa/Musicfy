"use strict"

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// cargar rutas
var user_routes = require("./routes/user");
var artists_routes = require("./routes/artists");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// configurar cabeceras http

// rutas base
app.use("/api", [user_routes, artists_routes]);

module.exports = app;