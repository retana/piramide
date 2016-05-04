var ruta=require('express').Router();
var usuario=require('../model/usuario.js');


ruta.get('/',function(peticion,respuesta){
	respuesta.send("Servidor iniciado");
});

ruta.get('/usuario',usuario.listar);
ruta.post('/usuario/autenticar',usuario.autenticar);
ruta.post('/usuario/registro',usuario.registrar);

module.exports=ruta;	