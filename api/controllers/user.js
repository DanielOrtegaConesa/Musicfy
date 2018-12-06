"use strict"

var bcrypt = require("bcrypt-nodejs");
var User = require("../models/user");
var jwt = require("../services/jwt");
var g = require("../genericas");
var fs = require("fs");
var path = require("path");

function pruebas(req, res){
    res.status(200).send({
        message: "Probando una accion del controlador de usuarios"
    });
}

function saveUser(req, res){
    var user = new User();
    var params = req.body;

    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    if(params.password){
        // encriptar contraseña
        bcrypt.hash(params.password,null,null,function(err,hash){
            user.password = hash;
            if(!g.isNullOrEmpty(user.name) && !g.isNullOrEmpty(user.surname) && !g.isNullOrEmpty(user.email)){
                // guardar el usuario
                user.save((err, userStored) => {
                    if(err){
                        res.status(500).send({message: "Error al guardar el usuario"});
                    }else{
                        if(!userStored){
                            res.status(400).send({message: "No se ha registrado el usuario"});
                        }else{
                            res.status(200).send({user: userStored});
                        }
                    }
                });
            }else{
                res.status(200).send({message: "Rellena todos los campos"});
            }
        });

    }else{
        res.status(200).send({message: "introduce la contraseña"});
    }
}

function loginUser(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()},(err,user) => {
        if(err){
            res.status(500).send({message: "Error en la peticion"});
        }else{
            if(!user){
                res.status(400).send({message: "El usuario no existe"});
            }else{
                // comprobar contraseña
                bcrypt.compare(password, user.password, (err, check) =>{
                    if(check){
                        //retornar los datos del usuario logeado
                        if(params.gethash){
                            // devolver un token jwt
                            res.status(200).send({
                                token: jwt.createTokern(user)
                            });
                        }else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(400).send({message: "El usuario no se ha podido logear"});
                    }
                });
            }
        }
    });
}

function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    if(userId != req.user.sub){        
        return res.status(500).send({message: "No tienes permisos para actualizar este usuario"});
    }
    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if(err){
            res.status(500).send({message: "Error al actualizar el usuario"});
        }else{
            if(!userUpdated){
                res.status(400).send({message: "No se ha podido actualizar el usuario"});
            }else{
                res.status(200).send({user: userUpdated});
            }
        }
    });
}

function uploadImage(req, res){
    var userId = req.params.id;
    var file_name = "No subido";
    
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split("\\");
        var file_name = file_split[2];

        var ext_split = file_name.split("\.");
        var file = ext_split[0];
        var file_ext = ext_split[1];

        if(file_ext == "png" || file_ext == "jpg" || file_ext == "gif"){
            user.findByIdAndUpdate(userId, {image: file_name}, (err, userUploaded) => {
                if(!userUploaded){
                    res.status(400).send({message: "No se ha podido actualizar el usuario"});
                }else{
                    res.status(200).send({user: userUploaded, image: file_name});
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
    var file_path = "./uploads/users/"+imageFile;
    fs.exists(file_path, (existe) =>{
        if(existe){
            res.sendFile(path.resolve(file_path));
        }else{
            res.status(200).send({message: "No existe la imagen"});
        }
    });
    
}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};