"use strict"

var fs = require("fs");
var path = require("path");

var Artist = require("../models/artist");
var Album = require("../models/album");
var Song = require("../models/song");
var mongoosePaginate = require("mongoose-pagination");

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

function getArtists(req, res){
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }
    
    var itemsPerPage = 3;

    Artist.find().sort("name").paginate(page, itemsPerPage, (err, artists, total) => {
        if(err){
            res.status(500).send({message: "Error en la peticion"});
        }else{
            if(!artists){
                res.status(400).send({message: "No hay artistas"});
            }else{
                return res.status(200).send({
                    total_items: total,
                    artists: artists
                });
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
    saveArtist,
    getArtists
};