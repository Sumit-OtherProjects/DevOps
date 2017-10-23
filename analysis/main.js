var esprima = require("esprima");
var options = {tokens:true, tolerant: true, loc: true, range: true };
var fs = require("fs");
var xmlbuilder = require('xmlbuilder');

function main()
{
	var args = process.argv.slice(2);

	var dir;
	if( args.length == 0 )
	{
		dir = './checkbox.io/server-side';
	}
	else {
		dir = args[0]
	}

	var file_list = [];
	walkSync(dir, file_list);

	// console.log(file_list);

	var all_builders = {};

	for (var i = 0; i < file_list.length; i++){
  		var file = file_list[i];
  		console.log("Handling file: ", file);
  		var builders = complexity(file);
  		all_builders[file] = builders;
  	}


  	var xml_output = output_report_file(all_builders);

  	fs.writeFile("./analysis_report.xml", xml_output.toString(), function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	});

	if (ShouldWeFail(all_builders)) {
		console.log("trigger build failure");
		throw new Error("Triggering build failure");
	}
	process.exit(0);
  	// for (var builder in all_builders) {
  	// 	for (var node in all_builders[builder]) {
  	// 		all_builders[builder][node].report();
  	// 	}
  	// }
}

function ShouldWeFail(builders) {
	for (var b in builders) {
		var builder = builders[b]
		for (var func in builder) {
			var s = builder[func]
			if (s.MaxNestingDepth > 3) {
				console.log("Big O for ", func, "function in file = ", b);
				return true;
			}
			else if (s.number_of_lines > 120){
				console.log("Too many number of lines in ", func, "function in file = ", b);
				return true
			}
			else if (s.number_of_sync_calls > 1){
				console.log("More than one sync calls in ", func, "function in file = ", b);
				return true
			}
			else if (s.msg_chain_length > 4){
				console.log("Big Message chain length for ", func, "function in file = ", b);
				return true
			}
		}
	}
	return false;
}


var walkSync = function(dir, filelist) {

  if( dir[dir.length-1] != '/') dir=dir.concat('/')

  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      if (file != 'node_modules')
      	filelist = walkSync(dir + file + '/', filelist);
    }
    else {
      if (file.endsWith('.js'))
      	filelist.push(dir+file);
    }
  });
  return filelist;
};

function output_report_file(builders) {
	var xw = xmlbuilder.create('analysis');
	for (var b in builders) {
		xw = xw.ele('file');
		xw = xw.ele('name');
		xw = xw.txt(b);
		xw = xw.up();
		var builder = builders[b];
		for (var func in builder) {
			var s = builder[func];
			// s.report();
			xw = xw.ele('function');

			xw = xw.ele('name');
			xw = xw.txt(func);
			xw = xw.up();

		    xw = xw.ele('bigo');
		    xw = xw.txt(s.MaxNestingDepth);
		    xw = xw.up();

			xw = xw.ele('lines_of_code');
		    xw = xw.txt(s.number_of_lines);
		    xw = xw.up();

		    xw = xw.ele('number_of_sync_calls');
		    xw = xw.txt(s.sync_calls_count);
		    xw = xw.up();

			xw = xw.ele('max_message_chain_length');
		    xw = xw.txt(s.msg_chain_length);
		    xw = xw.up();
		    
		    xw = xw.up();
		}
		xw = xw.up();	
	}
	xw = xw.end({ pretty: true });

	return xw;
}

// Represent a reusable "class" following the Builder pattern.
function FunctionBuilder()
{	
	this.number_of_lines = 0;
	this.sync_calls_count = 0;
	this.msg_chain_length = 0;
	this.StartLine = 0;
	this.FunctionName = "";
	// The number of parameters for functions
	this.ParameterCount  = 0,
	// Number of if statements/loops + 1
	this.SimpleCyclomaticComplexity = 0;
	// The max depth of scopes (nested ifs, loops, etc)
	this.MaxNestingDepth    = 0;
	// The max number of conditions if one decision statement.
	this.MaxConditions      = 0;

	this.report = function()
	{

		console.log(
		   (
		   	"{0}(): {1}\n" +
		   	"============\n" +
				"MaxNestingDepth: {3}\t" +
				"Number of Sync Calls: {4}\t" +
				"Number of Lines of Code: {5}\t" +
				"Message Chain Length: {6}\n\n"
			)
			.format(this.FunctionName, this.StartLine,
				     this.SimpleCyclomaticComplexity, this.MaxNestingDepth,
			        this.sync_calls_count, this.number_of_lines, this.msg_chain_length)
		);
	}
};

// A builder for storing file level information.
function FileBuilder()
{
	this.FileName = "";
	// Number of strings in a file.
	this.Strings = 0;
	// Number of imports in a file.
	this.ImportCount = 0;

	this.report = function()
	{
		console.log (
			( "{0}\n" +
			  "~~~~~~~~~~~~\n"+
			  "ImportCount {1}\t" +
			  "Strings {2}\n"
			).format( this.FileName, this.ImportCount, this.Strings ));
	}
}

// A function following the Visitor pattern.
// Annotates nodes with parent objects.
function traverseWithParents(object, visitor)
{
    var key, child;

    visitor.call(null, object);

    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null && key != 'parent') 
            {
            	child.parent = object;
					traverseWithParents(child, visitor);
            }
        }
    }
}

function getParamCount(node){
	return node['params'].length;
}

// Big O notation
// MAX DEPTH OF FOR/WHILE LOOPS
function getDepth2(child) {
	if (child.type == "ForInStatement" || child.type == "ForStatement" || child.type == "WhileStatement") {
		var d = getDepth(child.body.body);
		return 1 + d;
	}
	return 0;
}

function getDepth(node){
	var maxDepth = 0;
	traverseWithParents(node, function (child) {
		var d = getDepth2(child);
		if (d  > maxDepth)
			maxDepth = d;
	});
	return maxDepth;
}

// number of sync calls in a function
function getSyncCallsCount(node) {
	count = 0;
	traverseWithParents(node, function(child) {
		if( child.type == "CallExpression" && child.callee.property) {
			if (child.callee.property.name.indexOf("Sync") > -1) {
				count += 1;
			}
		}
	});
	return count;
}

// maximum message chain length in a function
function getChainLength(child) {
	if (child.type == "CallExpression") {
		if (child.callee)
			return getChainLength(child.callee);
	}
	else if (child.type == "MemberExpression" && child.object) {
		if (child.object)
			return 1 + getChainLength(child.object);
		else
			return 1;
	}
	else if (child.type == "Identifier")
		return 1;
	
	return 0;
}


function getMessageChainLength(node) {
	var maxLength = 1;
	traverseWithParents(node, function(child) {
		var l = getChainLength(child);
		if (l > maxLength) {
			maxLength = l;
			// console.log(child.loc.start.line, " to ", child.loc.end.line, ":", l)
		}
	});
	return maxLength;
}


// main function for calculating all features.
function complexity(filePath)
{
	var buf = fs.readFileSync(filePath, "utf8");
	var ast = esprima.parse(buf, options);

	var i = 0;

	// A file level-builder:
	var builders = {};

	// Tranverse program with a function visitor.
	traverseWithParents(ast, function (node) 
	{
		if (node.type === 'FunctionDeclaration' || node.type == 'FunctionExpression') 
		{
			var builder = new FunctionBuilder();

			builder.number_of_lines = node.loc.end.line - node.loc.start.line + 1;

			builder.FunctionName = functionName(node);
			builder.StartLine    = node.loc.start.line;
			builder.sync_calls_count = getSyncCallsCount(node);
			builder.msg_chain_length = getMessageChainLength(node);

			builder.MaxNestingDepth = getDepth(node);

			builders[builder.FunctionName] = builder;
		}

	});
	return builders;

}

// Helper function for printing out function name.
function functionName( node )
{
	if( node.id )
	{
		return node.id.name;
	}
	return "anon function @" + node.loc.start.line;
}

// Helper function for allowing parameterized formatting of strings.
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