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
                res.status(200).send({artist: artistStored});
            }
        }
    });
}

function updateArtist(req, res){
    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated)=> {
        if(err){
            res.status(500).send({message: "Error al guardar el artista"});
        }else{
            if(!artistUpdated){
                res.status(400).send({message: "El artista no ha sido actualizado"});
            }else{
                res.status(200).send({artist: artistUpdated});
            }
        }
    })
}

function deleteArtist(req, res){
    var artistId = req.params.id;
    Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
        if(err){
            res.status(500).send({message: "Error al eliminar el artista"});
        }else{
            if(!artistRemoved){
                res.status(404).send({message: "El artista no ha sido eliminado"});
            }else{
                Album.find({artist: artistRemoved._id}).remove((err, albumRemoved) => {
                    if(err){
                        res.status(500).send({message: "Error al eliminar el album"});
                    }else{
                        if(!albumRemoved){
                            res.status(400).send({message: "El album no ha sido eliminado"});
                        }else{
                            Song.find({album: albumRemoved._id}).remove((err, songRemoved) => {
                                if(err){
                                    res.status(500).send({message: "Error al eliminar la cancion"});
                                }else{
                                    if(!songRemoved){
                                        res.status(400).send({message: "La cancion no ha sido eliminada"});
                                    }else{
                                        res.status(400).send({artist: artistRemoved});
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}


function uploadImage(req, res){
    var artistId = req.params.id;
    var file_name = "No subido";
    
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split("\\");
        var file_name = file_split[2];

        var ext_split = file_name.split("\.");
        var file = ext_split[0];
        var file_ext = ext_split[1];

        if(file_ext == "png" || file_ext == "jpg" || file_ext == "gif"){
            Artist.findByIdAndUpdate(artistId, {image: file_name}, (err, artistUpdated) => {
                if(!artistUpdated){
                    res.status(400).send({message: "No se ha podido actualizar el usuario"});
                }else{
                    res.status(200).send({user: artistUpdated});
                }
            }); 
        }else{
            res.status(200).send({message: "Extension no valida"});
        }
    }else{
        res.status(200).send({message: "No se ha subido ninguna imagen"});
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var file_path = "./uploads/artists/"+imageFile;
    fs.exists(file_path, (existe) =>{
        if(existe){
            res.sendFile(path.resolve(file_path));
        }else{
            res.status(200).send({message: "No existe la imagen"});
        }
    });
    
}


module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
};