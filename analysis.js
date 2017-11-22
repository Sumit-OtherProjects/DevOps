var httpProxy = require('http-proxy');
var Random = require('random-js')
var request = require("request");


var api_logs = {'T': 0, 'F': 0};
var apicontrol_logs = {'T': 0, 'F': 0};
var apiexp_logs = {'T': 0, 'F': 0, 'N': 0};

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

var counter = 0;

MAX_REQUESTS = 1000;

for (var e = 0; e < MAX_REQUESTS; e++) {

	var options = {
		uri: "http://localhost:3000/gateway"
	};

	var flag = 0;

	request(options, function(err,res2,body){
		if (!res2) {
			console.log("API Service can not handle ratings going down");
			flag = 1;
		}
		else if(res2.statusCode == 500){
			if (res2.body.includes('APIEXP')) {
				apiexp_logs['F'] += 1;
			}
			else if (res2.body.includes('APICONTROL')) {
				apicontrol_logs['F'] += 1;
			}
			else if (res2.body.includes('API')) {
				api_logs['F'] += 1;
			}
		}
		else if(res2.statusCode == 200) {
			if (res2.body.includes('APIEXP')) {
				apiexp_logs['T'] += 1;
			}
			else if (res2.body.includes('APICONTROL')) {
				apicontrol_logs['T'] += 1;
			}
			else if (res2.body.includes('API')) {
				api_logs['T'] += 1;
			}
		}
		else {
			console.log("API Service can not handle ratings going down");
			if (res2.body.includes('APIEXP')) {
				apiexp_logs['N'] += 1;
			}
			// flag = 1;
		}
		counter += 1;
	});

	while (counter != e + 1) {
		require('deasync').runLoopOnce();
	}

	if (flag == 1)
		break;

}



console.log("-------- For API -------------");
console.log("Handled: ", api_logs['T'] + api_logs['F']);
console.log("Successful: ", api_logs['T']);
console.log("Gracefully Handled: ", api_logs['F']);


console.log("-------- For API CONTROL -------------");
console.log("Handled: ", apicontrol_logs['T'] + apicontrol_logs['F']);
console.log("Successful: ", apicontrol_logs['T']);
console.log("Gracefully Handled: ", apicontrol_logs['F']);


console.log("-------- For API EXPERIMENT -------------");
console.log("Handled: ", apiexp_logs['T'] + apiexp_logs['F'] + apiexp_logs['N']);
console.log("Successful: ", apiexp_logs['T']);
console.log("Gracefully Handled: ", apiexp_logs['F']);
console.log("Gracefully Not Handled: ", apiexp_logs['N']);