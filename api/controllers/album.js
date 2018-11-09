"use strict"

var fs = require("fs");
var path = require("path");

var Artist = require("../models/artist");
var Album = require("../models/album");
var Song = require("../models/song");
var mongoosePaginate = require("mongoose-pagination");

function getAlbum(req, res){
    var albumId = req.params.id;
    Album.findById(albumId).populate({path: "artist"}).exec((err, album)=>{
        if(err){
            res.status(500).send({message: "Error en la peticion"});
        }else{
            if(!album){
              res.status(400).send({message: "El album no existe"});  
            }else{
                res.status(200).send(album);
            }
        }
    });
}

function getAlbums(req, res){
    var artistId = req.params.id;

    if(!artistId){
        var find = Album.find({}).sort("title");
    }else{
        var find = Album.find({artist: artistId}).sort("year");
    }

    find.populate({path: "artist"}).exec((err, albums) => {
        if(err){
            res.status(500).send({message: "Error en la peticion"})
        }else{
            if(!albums){
                res.status(400).send({message: "No hay albums"});
            }else{
                res.status(200).send({albums})
            }
        }
    });
}

function updateAlbum(req, res){
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update, (err,albumUpdated) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"})
        }else{
            if(!albumUpdated){
                res.status(404).send({message: "No se ha actualizado el album"});
            }else{
                res.status(200).send({album: albumUpdated});
            }
        }
    });
}

function saveAlbum(req, res){
    var album = new Album();
    var params = req.body;
    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = "null";
    album.artist = params.artist

    album.save((err, albumStored) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!albumStored){
                res.status(400).send({message: "No se ha guardado el album"});  
            }else{
                res.status(200).send({album: albumStored});
            }
        }
    });
}

function deleteAlbum(req, res){
    var albumId = req.params.id;

    Album.findById(albumId,(err, albumRemoved) => {
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
                                        res.status(400).send({album: albumRemoved});
                                    }
                                }
                            });
                        }
                    }
    });
}

function uploadImage(req, res){
    var albumId = req.params.id;
    var file_name = "No subido";
    
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split("\\");
        var file_name = file_split[2];

        var ext_split = file_name.split("\.");
        var file = ext_split[0];
        var file_ext = ext_split[1];

        if(file_ext == "png" || file_ext == "jpg" || file_ext == "gif"){
            Album.findByIdAndUpdate(albumId, {image: file_name}, (err, albumUpdated) => {
                if(!albumUpdated){
                    res.status(400).send({message: "No se ha podido actualizar el usuario"});
                }else{
                    res.status(200).send({album: albumUpdated});
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
    var file_path = "./uploads/albums/"+imageFile;
    fs.exists(file_path, (existe) =>{
        if(existe){
            res.sendFile(path.resolve(file_path));
        }else{
            res.status(200).send({message: "No existe la imagen"});
        }
    });
    
}

module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
};