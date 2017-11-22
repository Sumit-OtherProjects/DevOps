var express = require('express')
var fs      = require('fs')
var app = express()
var request = require("request");

///////////// WEB ROUTES

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


app.get('/ratings', function(err, res) {
	res.writeHead(200, {'content-type':'text/html'});
	res.write("<h3>Ratings Service Working</h3>");
	res.end();
})


// HTTP SERVER
var server = app.listen(4000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Ratings API Server running at http://%s:%s', host, port)
})

exports 