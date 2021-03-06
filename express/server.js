/*var words = {
	"rainbow": 5,
	"unicorn": 3,
	"doom": -3,
	"gloom": -2
}
*/

var fs = require('fs');
var express = require('express');

var data = fs.readFileSync('words.json');
var words = JSON.parse(data);

var myParser = require("body-parser");


console.log('server is starting');
console.log(words);

var app = express();

var server = app.listen(8081, listening);

function listening(){
	console.log("listening. . .");
}

app.use(express.static('website'));

//app.get('/search/:flower/:num', sendFlower);
app.get('/add/:word/:score?', addWord);
app.use(myParser.urlencoded({extended : false}));
app.post('/show', function(req, res) {
	var data = req.body.params;
	
	//var word = data.word;
	//var score = data.score;
    res.send('word: ' + data);
	//res.send('Number: ' + score);
});

app.get('/all', sendAll);
app.post('/all', sendAll);
app.get('/search/:word/', searchWord);

app.get('/gettest', function(req, resp){
	var response = "Hello " + req.query.firstname;
	console.log(response);
	resp.end(response);
});

app.post('/posttest', function(req, resp){
	var response = "Hello " + req.query.firstname;
	console.log(response);
	resp.end(response);
});

function searchWord(request, response){
	
	var word = request.params.word;
	var reply;
	if(words[word]){
		reply = {
			status : "found",
			word: word,
			score: words[word]
		}
	}else{
		reply = {
			status: "Word not found",
			word: word
		}
	}
	response.send(reply);
	
}

function addWord(request, response){
	
	var data = request.params;
	var word = data.word;
	var score = Number(data.score);
	
	var reply;
	
	if(!score){
		reply = {
			msg: "Score is Required."
		}
		response.send(reply);
	}else{
		words[word] = score;
		var data = JSON.stringify(words, null, 2);
		fs.writeFile('words.json', data, finished);
		
		function finished(err){
			console.log('all set.');
		}
		reply = {
			word: word,
			score: score,
			msg: "Success"
		}
		response.send(reply);
	}	
}

function sendFlower(request, response){
	
	var data = request.params;
	var num = data.num;
	var reply = "";
	
	for (var i = 0; i < num; i++){
		reply += "Flower : " + data.flower + "<br/>";
	}
	response.send(reply);	
}

function sendAll(request, response){
	response.send(words);
}
