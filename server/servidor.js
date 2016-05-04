var app=require('express')();
var bodyParser=require('body-parser');
var cors = require('cors');
var morgan=require('morgan');
var puerto=8080;
	
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/api/v1',require('./controller'));

app.listen(puerto,function(){
	console.log("Servidor iniciado en el puerto "+puerto);
});