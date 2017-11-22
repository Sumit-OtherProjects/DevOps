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
	next();
	
});


app.get('/api', function(err, res) {
	var options = {
		uri: "http://localhost:4000/ratings"
	};

	request(options, function(err,res2,body){
		if(!res2 || res2.statusCode == 500){
			res.status(500).send("API: Ratings is Down");
			res.end();
		}
		else {
			res.writeHead(200, {'content-type':'text/html'});
			res.write("API: Ratings is Up");
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
			res.writeHead(200, {'content-type':'text/html'});
			res.write(res.body);
			res.end();
		});
	}

	
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