var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');


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
	var matchedTodo = _.findWhere(todos, {id: todoID});	
	if (matchedTodo){
		res.json(matchedTodo);
	} else {
		res.status(404).send('No such id');
	}
})
// POST /Todos/:id
app.post('/todos', function(req, res){
	var body = _.pick(req.body,'description', 'completed');
	
	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		return res.status(400).send();
	};
	body.description = body.description.trim()
	//add id field		
	body.id = todoNextID++;
	// push body into array
	todos.push(body)
	console.log('description: ' + body.description);
	res.json(body);
});

// DELETE /todos/:id
app.delete('/todos/:id', function(req, res){
	var todoID = parseInt(req.params.id, 10)
	var matchedTodo = _.findWhere(todos, {id: todoID})
	if(!matchedTodo){
		res.status(400).json("error", "no to do found with that id");
	} else {
		todos = _.without(todos, matchedTodo)
		res.json(matchedTodo);	
	}
});

app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT)
})