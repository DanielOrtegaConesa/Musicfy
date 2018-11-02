"use strict"

var bcrypt = require("bcrypt-nodejs");
var User = require("../models/user");
var g = require("../genericas");


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

module.exports = {
    pruebas,
    saveUser,
    loginUser
};