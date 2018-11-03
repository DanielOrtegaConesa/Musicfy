"use strict"

var fs = require("fs");
var path = require("path");

var Artist = require("../models/artist");
var Album = require("../models/album");
var Song = require("../models/song");

function getArtist(req, res){
    var artistId = req.params.id;

    Artist.findById(artistId, (err, artist) => {
        if(err){
            res.status(500).send({message: "Error en la peticion"});
        }else{
            if(!artist){
                res.status(400).send({message: "El artista no existe"});
            }else{
                res.status(200).send({artist});
            }
        }
    });
}

function saveArtist(req, res){
    var artist = new Artist();
    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = "null";

    artist.save((err, artistStored) => {
        if(err){
            res.status(500).send({message: "Error al guardar el artista"});
        }else{
            if(!artistStored){
                res.status(400).send({message: "El artista no ha sido guardado"});
            }else{
                res.status(200).send({aritst: artistStored});
            }
        }
    });
}


module.exports = {
    getArtist,
    saveArtist
};