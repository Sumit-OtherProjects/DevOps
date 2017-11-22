var express = require('express');
var fs      = require('fs');
var app = express();
var httpProxy = require('http-proxy');
var Random = require('random-js')
var request = require("request");


///////////// WEB ROUTES

rand = new Random(Random.engines.mt19937().seed(0));

// var requests = []
app.use(function(req, res, next) 
{
	console.log(req.method, req.url);
	// if (req.url == "/recent" || req.url == "/favicon.ico")
	// 	next();
	// else {
	// 	if (requests.length >= 5) {
	// 		requests.pop()
	// 	}
	// 	requests.unshift(req.method +" "+ req.url);
	// 	// ... INSERT HERE.
	
	// 	next(); // Passing the request to the next handler in the stack.
	// }
	next();
	
});


app.get('/api', function(err, res) {
	var options = {
		uri: "http://localhost:4000/ratings"
	};

	request(options, function(err,res2,body){
		if(!res2 || res2.statusCode == 500){
			res.status(500).send(res2.body);
		}
		else {
			res.writeHead(200, {'content-type':'text/html'});
			res.write(res2.body);
			res.write("Processing Thru /API")
			res.end();
		}
	});
})

app.get('/apicontrol', function(err, res) {
	var options = {
		uri: "http://localhost:4000/ratings"
	};

	request(options, function(err,res2,body){
		if(!res2 || res2.statusCode == 500){
			res.status(500).send(res2.body);
		}
		else {
			res.writeHead(200, {'content-type':'text/html'});
			res.write(res2.body);
			res.write("Processing Thru /APICONTROL")
			res.end();
		}
	});
});

app.get('/apiexperiment', function(err, res) {
	res.writeHead(500, {'content-type':'text/html'});
	res.write("Ratings Service is Down <br/>");
	res.write("Processing thru API Experiment");
	res.end();
});

app.get('/gateway', function(req, res) {
	var options;
	if (rand.bool(0.80)){
		options = {
			uri: "http://localhost:3000/api"
		};
	}
	else {
		if (rand.bool(0.5)) {
			options = {
				uri: "http://localhost:3000/apiexperiment"
			};
		}
		else{
			options = {
				uri: "http://localhost:3000/apicontrol"
			};
		}
	}

	res.redirect(options.uri); 

})

// HTTP SERVER
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})

exports 