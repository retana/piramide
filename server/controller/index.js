var ruta=require('express').Router();
var usuario=require('../model/usuario.js');


ruta.get('/',function(peticion,respuesta){
	respuesta.send("Servidor iniciado");
});
ruta.post('/usuario/autenticar',usuario.autenticar)
ruta.post('/usuario/registro',usuario.registrar);
ruta.get('/token',usuario.tokenGenerator);

ruta.use(usuario.tokenMidleware);

ruta.get('/usuario',usuario.listar);

module.exports=ruta;	