"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AlbumtSchema = Schema({
    title: String,
    description: String,
    imayear: Number,
    image: String,
    artist: {type: Schema.ObjectId, ref: "Artist"}
});

module.exports = mongoose.model("Album", AlbumSchema);