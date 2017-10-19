var redis = require('redis')
var multer  = require('multer')
var express = require('express')
var fs      = require('fs')
var app = express()
// REDIS
var client = redis.createClient(6379, '127.0.0.1', {})

///////////// WEB ROUTES

// Add hook to make it easier to get all visited URLS.

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
	client.lpush("recents", req.url, function(err,value) {
		client.ltrim("recents", 0, 4);
		next();
	})
	
});


// app.post('/upload',[ multer({ dest: './uploads/'}), function(req, res){
//    console.log(req.body) // form fields
//    console.log(req.files) // form files

//    if( req.files.image )
//    {
// 	   fs.readFile( req.files.image.path, function (err, data) {
// 	  		if (err) throw err;
// 	  		var img = new Buffer(data).toString('base64');
// 	  		console.log(img);
// 		});
// 	}

//    res.status(204).end()
// }]);

// app.get('/meow', function(req, res) {
// 	{
// 		if (err) throw err
// 		res.writeHead(200, {'content-type':'text/html'});
// 		items.forEach(function (imagedata) 
// 		{
//    		res.write("<h1>\n<img src='data:my_pic.jpg;base64,"+imagedata+"'/>");
// 		});
//    	res.end();
// 	}
// })

app.get('/set', function(req, res) {
	// console.log(req.route.path);
	client.set("key", "expiring in 10 seconds", function(err, value) {
		client.expire("key", 10, function() {
			res.writeHead(200, {'content-type':'text/html'});
			res.write("<h3>created a key for 10 seconds</h3>");
			   res.end();
		});
	});
})

app.get('/get', function(req, res) {
	client.get("key", function(err, value) {
		client.ttl("key", function(err, time) {
			res.writeHead(200, {'content-type':'text/html'});
			res.write("<h3>"+value+" - time_remaining = " + time + "</h3>");
			   res.end();
		});
	});
})

app.get('/recent', function(req, res) {
	{
		// res.writeHead(200, {'content-type':'text/html'});
		// for (var a =0; a < requests.length; a++){
		// 	res.write(requests[a] + "<br />");
		// }
   		// res.end();
		
		client.lrange("recents", 0, -1, function(err, list){
			res.writeHead(200, {'content-type':'text/html'});
			for (var a =0; a < list.length; a++){
				res.write(list[a] + "<br />");
			}
			res.end();
		})
	}
})

app.get('/test', function(req, res) {
	{
		res.writeHead(200, {'content-type':'text/html'});
		res.write("<h3>test</h3>");
   		res.end();
	}
})

// HTTP SERVER
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})

exports 