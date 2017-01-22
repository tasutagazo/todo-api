var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,	
	description: "Meet Najib for lunch",
	completed: false
}, {
	id: 2,
	description: "Give 2.6b",
	completed: false
}, {
	id: 3,
	description: "Cover your ass",
	completed: true
}];
app.get('/', function(req, res){
	res.send('Todo API Root');
})
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
app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT)
})