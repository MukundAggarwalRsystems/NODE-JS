var connect = require('connect');
var http = require('http');

var app = connect();

function profile(request, response){
	console.log('User requested profile');
	
}

function forum(request, response){
	console.log('User requested forum');
	
}

app.use('/profile', profile);
app.use('/forum', forum);

http.createServer(app).listen(8081);
console.log("Server is running");