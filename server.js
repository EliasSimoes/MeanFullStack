var express = require('express');
var app = express();
var mongojs = require('mongojs');// requer o mongodb
var db = mongojs('contactlist',['contactlist']);//diz qual db e qual collection
var bodyParser = require('body-parser');//requerimento da função body

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
	 console.log("Eu recebi uma requisição GET")
	 db.contactlist.find(function (err, docs){
 		console.log(docs);//aqui é pra garantir que o dado foi pego pelo db
 		res.json(docs);//aqui é a resposta do objeto json
 });

//post no mongodb
app.post('/contactlist', function(req, res){
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

});
//delete do mongodb
app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
		console.log(id);
			db.contactlist.remove({_id: mongojs.ObjectId(id)}, 
				function(err, doc) {
				res.json(doc);
			});
				
});				
//editando o dado enviado ao banco
app.get('/contactlist/:id', function (req, res){
	var id = req.params.id;
		console.log(id);
			db.contactlist.findOne({_id: mongojs.ObjectId(id)}, 
				function(err, doc) {
				res.json(doc);
			});
});

app.listen(3000);
console. log("Servidor rodando na porta 3000");