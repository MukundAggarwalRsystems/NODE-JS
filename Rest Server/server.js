// server.js



// call the packages we need
var express = require('express');	// call express
var app	= express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;	// set our port

var router = express.Router();

router.get('/', function(req, res){
		res.json({message: 'hooray! welcome to api'});
	}
)

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port' + port);
