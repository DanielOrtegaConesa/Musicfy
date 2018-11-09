"use strict"

var mongoose = require("mongoose");
var app = require("./app");
var port = 3977;

mongoose.connect("mongodb://localhost:27017/musicfy",{ useNewUrlParser: true }, (err, res) => {
    if(err){
        throw err;
    }else{
        console.log("La conexion a la base de datos esta funcionando correctamente...");
        app.listen(port, function(){
            console.log("Servidor del api rest esuchando peticiones http:/localhost:"+port);
        });
    }
})