"use strict"

var bcrypt = require("bcrypt-nodejs");
var User = require("../models/user");

function isNullOrEmpty(dato){
    return (dato == "" || dato == null)
}

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
            if(!isNullOrEmpty(user.name) && !isNullOrEmpty(user.surname) && !isNullOrEmpty(user.email)){
                // guardar el usuario
                user.save((err, userStored) => {
                    if(err){
                        res.status(500).send({message: "Error al guardar el usuario"});
                    }else{
                        if(!userStored){
                            res.status(400).send({message: "No se ha registrado el usuario"});
                        }else{
                            res.status(200).send({user: {userStored}});
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

module.exports = {
    pruebas,
    saveUser
};