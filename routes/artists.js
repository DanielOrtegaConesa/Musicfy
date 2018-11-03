"use strict"

var express = require("express");
var ArtistController = require("../controllers/artists");
var api = express.Router();

var md_auth = require("../middlewares/autenticated");

api.get("/artist/:id", md_auth.ensureAuth, ArtistController.getArtist);
api.post("/artist", md_auth.ensureAuth, ArtistController.saveArtist);
api.get("/artists/:page?", md_auth.ensureAuth, ArtistController.getArtists);
api.put("/artist/:id", md_auth.ensureAuth, ArtistController.updateArtist);

module.exports = api;