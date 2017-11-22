var express = require('express')
var fs      = require('fs')
var app = express()
var request = require("request");

///////////// WEB ROUTES
var Random = require('random-js')



///////////// WEB ROUTES

rand = new Random(Random.engines.mt19937().seed(0));

// var requests = []
app.use(function(req, res, next) 
{
	console.log(req.method, req.url);
	next();
	
});


app.get('/apicontrol', function(err, res) {
	var options = {
		uri: "http://localhost:4000/ratings"
	};

	request(options, function(err,res2,body){
		if(!res2 || res2.statusCode == 500){
			res.status(500).send("APICONTROL: Ratings is Down");
			res.end();
		}
		else {
			res.writeHead(200, {'content-type':'text/html'});
			res.write("APICONTROL: Ratings is Up");
			res.end();
		}
	});
});

app.get('/apiexperiment', function(err, res) {
	if (rand.bool(0.5)) {
		res.writeHead(500, {'content-type':'text/html'});
		res.write("APIEXP: Ratings is Down");
		res.end();	
	}
	else {
		var options = {
			uri: "http://localhost:4000/ratings1"
		};

		request(options, function(err,res2,body){
			res.writeHead(400, {'content-type':'text/html'});
			res.write("APIEXP: Not Handled");
			res.end();
		});
	}
});

// HTTP SERVER
var server = app.listen(5000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Experimental API Server running at http://%s:%s', host, port)
})



exports 