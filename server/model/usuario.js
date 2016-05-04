var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'db_agenda'
});

connection.connect();

var usuario={
	listar:function(req,res){
		connection.query('Select * from usuario', function(err, rows) {
		if (err) 
			throw err;
		else
			res.json(rows);
		});
	},
	autenticar:function(req,res){
		console.log(req.body.nick);
		connection.query("Select * from usuario where usuario.correo='"+req.body.correo+"' and usuario.contrasena='"+req.body.contrasena+"'", function(err, rows) {
			if (err) 
				throw err;
			else
				res.json(rows);
			}
		);
	},
	registrar:function(req,res){
		connection.query("Insert into usuario values(null,'"+req.body.nombre+"','"+req.body.correo+"','"+req.body.contrasena+"', 2 )",function(err){
			if (err) 
				throw err;
			else
				res.json({mensaje:"El registro se añadio correctamente"});
		});	
	}
}

module.exports=usuario;