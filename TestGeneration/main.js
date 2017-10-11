var esprima = require("esprima");
var options = {tokens:true, tolerant: true, loc: true, range: true };
var faker = require("faker");
var fs = require("fs");
faker.locale = "en";
var mock = require('mock-fs');
var _ = require('underscore');
var Random = require('random-js');

function main()
{
	var args = process.argv.slice(2);

	if( args.length == 0 )
	{
		args = ["subject.js"];
	}
	var filePath = args[0];

	constraints(filePath);

	generateTestCases()

}

var engine = Random.engines.mt19937().autoSeed();

function createConcreteIntegerValue( greaterThan, constraintValue )
{
	if( greaterThan )
		return Random.integer(constraintValue,constraintValue+10)(engine);
	else
		return Random.integer(constraintValue-10,constraintValue)(engine);
}

function Constraint(properties)
{
	this.ident = properties.ident;
	this.expression = properties.expression;
	this.operator = properties.operator;
	this.value = properties.value;
	this.altvalue = properties.altvalue;
	this.funcName = properties.funcName;
	// Supported kinds: "fileWithContent","fileExists"
	// integer, string, phoneNumber
	this.kind = properties.kind;
}

function fakeDemo()
{
	console.log( faker.phone.phoneNumber() );
	console.log( faker.phone.phoneNumberFormat() );
	console.log( faker.phone.phoneFormats() );
}

var functionConstraints =
{
}

var mockFileLibrary = 
{
	pathExists:
	{
		'path/fileExists': {'file1.txt':'text from file1'},
		'path/emptyDir' : {}
	},
	fileWithContent:
	{
		pathContent: 
		{	
			  'file1.txt': 'text content',
			  'emptyFile.txt' : ''
		}
	}
};

function initalizeParams(constraints)
{
	var params = {};
	
	// initialize params
	for (var i =0; i < constraints.params.length; i++ )
	{
		var paramName = constraints.params[i];
		params[paramName] = new Set();
	}
	return params;	
}

function fillParams(constraints,params,property)
{
	// plug-in values for parameters
	for( var c = 0; c < constraints.length; c++ )
	{
		var constraint = constraints[c];
		if( params.hasOwnProperty( constraint.ident ) )
		{
			params[constraint.ident].add(constraint[property]);
		}
	}
}

function createCombinations(args, start, temp, result) {
	if (start == args.length) {
		// console.log(temp);
		result.push(temp);
	}
	else {
		var temp2 = temp.slice();
		if (args[start].length == 0) {
			temp2[start] = '\'\'';
			createCombinations(args, start+1, temp2, result);
		}
		for(var i = 0; i < args[start].length; i++) {
			temp2 = temp.slice();
			temp2[start] = args[start][i];
			createCombinations(args, start+1, temp2, result);
		}
	}
}

function convertSetsToArrays(sets) {
	result = [];
	for (var i = 0; i < sets.length; i++) {
		// console.log(sets[i]);
		result.push(Array.from(sets[i]));
	}
	return result;
}

function generateTestCases()
{

	var content = "var subject = require('./subject.js')\nvar mock = require('mock-fs');\n";
	
	for ( var funcName in functionConstraints )
	{

		var params = initalizeParams(functionConstraints[funcName])
		var altparams = initalizeParams(functionConstraints[funcName])
		
		//console.log( params );

		// update parameter values based on known constraints.
		var constraints = functionConstraints[funcName].constraints;
		// Handle global constraints...
		var fileWithContent = _.some(constraints, {kind: 'fileWithContent' });
		var pathExists      = _.some(constraints, {kind: 'fileExists' });

		fillParams(constraints,params,"value");
		fillParams(constraints,params,"altvalue");
		
		//console.log("ALT",altparams)
		//console.log("P",params)

		// Prepare function arguments.
		// console.log(Object.keys(params).map( function(k) {return params[k]; }))
		arrayParams = convertSetsToArrays(Object.keys(params).map( function(k) {return params[k]; }))
		// console.log(arrayParams);
		
		// console.log(params);

		// var altargs = Object.keys(altparams).map( function(k) {return altparams[k]; }).join(",");
		
		if( pathExists || fileWithContent )
		{
			combinations = []
			createCombinations(arrayParams, 0, Array(arrayParams.length), combinations);

			for (var i = 0; i < combinations.length; i++) {
				var args = combinations[i];
				content += generateMockFsTestCases(pathExists,fileWithContent,funcName, args);
				// Bonus...generate constraint variations test cases....
				content += generateMockFsTestCases(!pathExists,fileWithContent,funcName, args);
				content += generateMockFsTestCases(pathExists,!fileWithContent,funcName, args);
				content += generateMockFsTestCases(!pathExists,!fileWithContent,funcName, args);
			}
			
		}
		else
		{
			// fillParams(constraints, params, "altvalue");
			// console.log( altargs )
			// Emit simple test case.
			// TODO: write logic to generate different permutations of argument values 
			// This should increase coverage significantly
			// content += "subject.{0}({1});\n".format(funcName, args );
			// console.log(Object.values(params));
			// console.log(Object.values(altparams));
			// content += "subject.{0}({1});\n".format(funcName, altargs );

			combinations = [];
			arrayParams = convertSetsToArrays(Object.values(params))
			// console.log(Object.values(params))
			createCombinations(arrayParams, 0, Array(arrayParams.length), combinations);
			// console.log(Object.values(params));
			// console.log(combinations);
			// combinations = createPermutations(Object.values(params), Object.values(altparams));
			for (var i = 0; i < combinations.length; i++) {
				content += "subject.{0}({1});\n".format(funcName, combinations[i]);
			}
		}

	}


	fs.writeFileSync('test.js', content, "utf8");

}

function generateMockFsTestCases (pathExists,fileWithContent,funcName,args) 
{
	var testCase = "";
	// Build mock file system based on constraints.
	var mergedFS = {};
	if( pathExists )
	{
		for (var attrname in mockFileLibrary.pathExists) { mergedFS[attrname] = mockFileLibrary.pathExists[attrname]; }
	}
	if( fileWithContent )
	{
		for (var attrname in mockFileLibrary.fileWithContent) { mergedFS[attrname] = mockFileLibrary.fileWithContent[attrname]; }
	}

	testCase += 
	"mock(" +
		JSON.stringify(mergedFS)
		+
	");\n";

	testCase += "\tsubject.{0}({1});\n".format(funcName, args );
	testCase+="mock.restore();\n\n";
	return testCase;
}

function constraints(filePath)
{
   var buf = fs.readFileSync(filePath, "utf8");
	var result = esprima.parse(buf, options);

	traverse(result, function (node) 
	{
		if (node.type === 'FunctionDeclaration') 
		{
			var funcName = functionName(node);
			// console.log("Line : {0} Function: {1}".format(node.loc.start.line, funcName ));

			var params = node.params.map(function(p) {return p.name});

			functionConstraints[funcName] = {constraints:[], params: params};

			// Check for expressions using argument.
			traverse(node, function(child)
			{
				if( child.type === 'BinaryExpression' && child.operator == "==")
				{
					if( child.left.type == 'Identifier' && params.indexOf( child.left.name ) > -1)
					{
						// get expression from original source code:
						var expression = buf.substring(child.range[0], child.range[1]);
						var rightHand = buf.substring(child.right.range[0], child.right.range[1])
						var altright;
						if (isNaN(parseFloat(rightHand))){
							if (rightHand == "undefined") {
								altright = false;
							}
							else {
								altright = rightHand.substring(0, rightHand.length-1) + "a\"";
							}
						}
						else {
							altright = parseFloat(rightHand) + 1;
						}
						functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.left.name,
								value: rightHand,
								altvalue: altright,
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));
					}
					else if (child.left.type != 'Identifier') {
						var expression = buf.substring(child.range[0], child.range[1]);
						var rightHand = buf.substring(child.right.range[0], child.right.range[1])
						var lend = expression.indexOf('.');
						var lparamName = expression.substring(0, lend);

						if(expression.includes('indexOf') && params.indexOf( lparamName ) > -1){
							var text = "'";
							var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
						  
							for (var i = 0; i < parseInt(rightHand); i++) {
								text += possible.charAt(Math.floor(Math.random() * possible.length));
							}
							var l = expression.indexOf(')');
							var start = expression.indexOf('(')
							text += expression.substring(start+2, l-1);
							// console.log("non integer expression", text, expression);
							var altvalue = text + "a" + "'";
							text += "'"
							// console.log(child.left);
							console.log(text);
							console.log(altvalue);

							functionConstraints[funcName].constraints.push( 
								new Constraint(
								{
									ident: lparamName,
									value: text,
									altvalue: altvalue,
									funcName: funcName,
									kind: "integer",
									operator : child.operator,
									expression: expression
								}));
						}
						
					}
				}

				if( child.type === 'BinaryExpression' && child.operator == "<" )
				{
					if( child.left.type == 'Identifier' && params.indexOf( child.left.name ) > -1)
					{
						// get expression from original source code:
						var expression = buf.substring(child.range[0], child.range[1]);
						var rightHand = buf.substring(child.right.range[0], child.right.range[1])

						functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.left.name,
								value: parseInt(rightHand) - 1,
								altvalue: parseInt(rightHand) +1,
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));
					}
				}

				if( child.type === 'BinaryExpression' && child.operator == ">" )
				{
					if( child.left.type == 'Identifier' && params.indexOf( child.left.name ) > -1)
					{
						// get expression from original source code:
						var expression = buf.substring(child.range[0], child.range[1]);
						var rightHand = buf.substring(child.right.range[0], child.right.range[1])

						functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.left.name,
								value: parseInt(rightHand) + 1,
								altvalue: parseInt(rightHand) -1,
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));
					}
				}

				if (child.type == 'UnaryExpression' && child.operator == '!') {
					if (child.argument.type == 'Identifier' && params.indexOf(child.argument.name) > -1) {
						functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.argument.name,
								value: 'undefined',
								altvalue: '{}',
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));
					}
					else if (child.argument.type == 'MemberExpression' && params.indexOf(child.argument.object.name) > -1) {
						functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.argument.object.name,
								value: '{}',
								altvalue: '{"'+child.argument.property.name+'": true}',
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));
					}
				}

				if( child.type == "CallExpression" && 
					 child.callee.property &&
					 child.callee.property.name =="readFileSync" )
				{
					for( var p =0; p < params.length; p++ )
					{
						if( child.arguments[0].name == params[p] )
						{
							functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: params[p],
								value:  "'pathContent/file1.txt'",
								altvalue: "'pathContent/emptyFile.txt'",
								funcName: funcName,
								kind: "fileWithContent",
								operator : child.operator,
								expression: expression
							}));
						}
					}
				}

				if( child.type == "CallExpression" &&
					 child.callee.property &&
					 child.callee.property.name =="readdirSync")
				{
					for( var p =0; p < params.length; p++ )
					{
						if( child.arguments[0].name == params[p] )
						{
							functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: params[p],
								// A fake path to a file
								value:  "'path/fileExists'",
								altvalue: "'path/emptyDir'",
								funcName: funcName,
								kind: "fileExists",
								operator : child.operator,
								expression: expression
							}));
						}
					}
				}

			});

			// console.log( functionConstraints[funcName]);

		}
	});
}

function traverse(object, visitor) 
{
    var key, child;

    visitor.call(null, object);
    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null) {
                traverse(child, visitor);
            }
        }
    }
}

function traverseWithCancel(object, visitor)
{
    var key, child;

    if( visitor.call(null, object) )
    {
	    for (key in object) {
	        if (object.hasOwnProperty(key)) {
	            child = object[key];
	            if (typeof child === 'object' && child !== null) {
	                traverseWithCancel(child, visitor);
	            }
	        }
	    }
 	 }
}

function functionName( node )
{
	if( node.id )
	{
		return node.id.name;
	}
	return "";
}


if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

main();
exports.main = main;
