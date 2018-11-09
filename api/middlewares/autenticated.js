"use strict"

var jwt = require("jwt-simple");
var moment = require("moment");
var clave = "la clave mas segura del mundo!";

exports.ensureAuth = function(req, res, next){

    if(!req.headers.authorization){
        return res.status(403).send({message: "La peticion no tiene la cabezera authorization"});
    }

    var token = req.headers.authorization.replace(/['"]+/g,'');

    try{
        var payload = jwt.decode(token, clave);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: "El token ha expirado"});
        }
    }catch(e){
        // console.log(e);
        return res.status(403).send({message: "Token no valido"});
    }

    req.user = payload;
    next();
};