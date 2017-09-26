var Random = require('random-js')
    marqdown = require('./marqdown.js'),
    fs = require('fs'),
    //stackTrace = require('stack-trace')
    stackTrace = require('stacktrace-parser')
    ;

var fuzzer = 
{
    random : new Random(Random.engines.mt19937().seed(0)),
    
    seed: function (kernel)
    {
        fuzzer.random = new Random(Random.engines.mt19937().seed(kernel));
    },

    mutate:
    {
        string: function(val)
        {
            // MUTATE IMPLEMENTATION HERE
            var array = val.split('');

            if( fuzzer.random.bool(0.05) )
            {
                // REVERSE
                array.reverse();
            }

            var count = 1;
            if (fuzzer.random.bool(0.05)){
                count++;
            }

            for (var counter = 0; counter < count; counter++) {
                if( fuzzer.random.bool(0.25) )
                {
                    // SPLICE DELETE
    
                    var start = fuzzer.random.integer(0,array.length)
                    var num = fuzzer.random.integer(1,10)
                    array.splice(start, num)
                    
                }
    
                if( fuzzer.random.bool(0.25) )
                {
                    // SPLICE INSERT
    
                    var start = fuzzer.random.integer(0,array.length);
                    var num = fuzzer.random.integer(1,10)
                    var new_chars = fuzzer.random.string(num).split('');
                    array.splice.apply(array, [start, 0].concat(new_chars))
                    
                }
            }

            return array.join('');
        }
    }
};

// fuzzer.seed(0);
//var markDown = fs.readFileSync('simple.md','utf-8');
mutationTesting(['simple.md', 'test.md'],1000);

function mutationTesting(path,iterations)
{
    var failedTests = [];
    var reducedTests = [];
    var passedTests = 0;
    
    var markDown1 = fs.readFileSync(path[0],'utf-8');
    var markDown2 = fs.readFileSync(path[1],'utf-8');
    for (var i = 0; i < iterations; i++) {
        if (fuzzer.random.bool(0.5)) {
            mutuatedString = fuzzer.mutate.string(markDown1);
        }
        else{
            mutuatedString = fuzzer.mutate.string(markDown2);
        }
        try
        {
            marqdown.render(mutuatedString);
            passedTests++;
        }
        catch(e)
        {
            failedTests.push( {input:mutuatedString, stack: e.stack} );
        }
    }

    // RESULTS OF FUZZING
    reduced = {}
    for( var i =0; i < failedTests.length; i++ )
    {
        var failed = failedTests[i];

        var trace = stackTrace.parse( failed.stack );
        var msg = failed.stack.split("\n")[0];
        console.log( msg, trace[0].methodName, trace[0].lineNumber );

        var key = trace[0].methodName + trace[0].lineNumber;
        if (!reduced.hasOwnProperty(key)) {
            reducedTests.push(failedTests[i]);
            reduced[key] = failedTests[i];
        }
    }

    console.log( "passed {0}, failed {1}, reduced {2}".format(passedTests, failedTests.length, reducedTests.length) );

}

exports.mutationTesting = mutationTesting;
exports.fuzzer = fuzzer;

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
