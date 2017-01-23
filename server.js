var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextID = 1;
app.get('/', function(req, res){
	res.send('Todo API Root');
})
app.use(bodyParser.json());
// GET /todos
app.get('/todos', function(req, res){
	res.json(todos);
});
// GET /todos/:id
app.get('/todos/:id', function(req, res){
	var todoID = parseInt(req.params.id, 10);	
	var matchedTodo;	
	// iterate over todo array to find match
	for (var i = 0; i < todos.length; i++) {
		if (todoID === todos[i].id){
			matchedTodo = todos[i];
		} 
	}
	if (matchedTodo){
		res.json(matchedTodo);
	} else {
		res.status(404).send('No such id');
	}
})
// POST /Todos/:id
app.post('/todos', function(req, res){
	var body = req.body;
	//add id field
	body.id = todoNextID++;
	// push body into array
	todos.push(body)
	console.log('description ' + body.description);
	res.json(body);
});




app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT)
})