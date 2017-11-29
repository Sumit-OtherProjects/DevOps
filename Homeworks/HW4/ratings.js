var express = require('express')
var fs      = require('fs')
var app = express()
var request = require("request");

///////////// WEB ROUTES

// var requests = []
app.use(function(req, res, next) 
{
	console.log(req.method, req.url);
	next();
	
});


app.get('/ratings', function(err, res) {
	res.writeHead(200, {'content-type':'text/html'});
	res.write('1');
	res.end();
})

app.get('/ratings1', function(err, res) {
	res.writeHead(500, {'content-type':'text/html'});
	res.end();
})

// HTTP SERVER
var server = app.listen(4000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Ratings API Server running at http://%s:%s', host, port)
})



exports 