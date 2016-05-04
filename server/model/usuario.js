var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'db_agenda'
});

connection.connect();
var jwt=require('jsonwebtoken');
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
		console.log(req.body.username+" "+req.body.password);
		connection.query("Select * from usuario where usuario.correo='"+req.body.username+"' and usuario.contrasena='"+req.body.password+"'", function(err, rows) {
			if (err) 
				throw err;
			else
				if(rows[0].length>0)
					console.log(genToken(rows[0]));
					res.json(genToken(rows[0]));
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
	},
	tokenGenerator:function(req,res){
		var token=jwt.sign({company:'piramide'},'APP@agendaOnline');
		res.send(token);
	},
	tokenMidleware:function(req,res,next){
		var token=req.headers['x-access-token'] || req.body.token || req.query.token;
		if(token){
			jwt.verify(token,'APP@agendaOnline',function(err,decoded){
				if(err){
					return res.status(403).send({
						success:false,
						message:'Fallo al validar token'
					});
				}
				req.user=decoded;
				next();
			});
		}else{
			return res.status(403).send({
				success:false,
				message:'No se proporciono token'
			});
		}
	}
}
function expiresIn(dias){
	var dateObj=new Date();
	return dateObj.setDate(dateObj.getDate()+dias);
}
function genToken(user){
	var payload=jwt.sign({
			"company":"piramide"
		},
		'APP@agendaOnline');
	var token={
		"token":payload,
		"user":user,
		"exp": expiresIn(1)
	}
	return token;
}
module.exports=usuario;