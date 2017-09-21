var fs = require('fs'),
    xml2js = require('xml2js'),
    child  = require('child_process'),
    Bluebird = require('bluebird');
var parser = new xml2js.Parser();

var testReport =  '/simplecalc/target/surefire-reports/TEST-com.github.stokito.unitTestExample.calculator.CalculatorTest.xml';


checkFlakyness();

async function checkFlakyness() {

    var flakyness = {};

    for (var j = 0; j < 10; j++){
        console.log('starting iter ', j);
        try{
            child.execSync('cd simplecalc; mvn test');
        }
        catch(e)
        {
            // console.log(e);
        }


        var contents = fs.readFileSync(__dirname + testReport);
        
        let results = await Bluebird.fromCallback(cb => parser.parseString(contents, cb));
        
        var all_tests = checkResults(results);

        for (var i = 0; i < all_tests.length; i++) {
            console.log(i, all_tests[i]['$'].name, all_tests[i]['$'].time, all_tests[i].hasOwnProperty('failure') ? "failed": "passed");
            var k = all_tests[i]['$'].name;
            if (!(k in flakyness)) {
                flakyness[k] = 0;
            }
            if (all_tests[i].hasOwnProperty('failure')) {
                    flakyness[k] = flakyness[k] + 1;
            }
            
        }

        console.log('-------');

        // console.log(flakyness);
    }
    var keys = Object.keys(flakyness);
    for (var i = 0; i < keys.length; i++) {
        if (flakyness[keys[i]] > 0 && flakyness[keys[i]] != 10) {
            console.log('Flaky Test Case: ', keys[i]);
        }
    }
};

function checkResults(result) {
    var all_tests = [];
    
    for( var i = 0; i < result.testsuite['$'].tests; i++ )
    {
        var testcase = result.testsuite.testcase[i];
        all_tests.push(testcase);

    }

    all_tests.sort(compareTestCases);

    return all_tests;
};

/*
try{
    child.execSync('cd simplecalc; mvn test');
}
catch(e)
{
    //console.log(e);
}


fs.readFile(__dirname + testReport, function(err, data) {
    parser.parseString(data, function (err, result) {
        var all_tests = [];
        
        for( var i = 0; i < result.testsuite['$'].tests; i++ )
        {
            var testcase = result.testsuite.testcase[i];
            all_tests.push(testcase);

        }

        all_tests.sort(compareTestCases);

        for (var i = 0; i < all_tests.length; i++) {
            console.log(all_tests[i]['$'].name, all_tests[i]['$'].time, all_tests[i].hasOwnProperty('failure') ? "failed": "passed");
        }
    });
});
*/

function compareTestCases(a, b){
    if (a.hasOwnProperty('failure')){
        if (b.hasOwnProperty('failure')) {
            if (a['$'].time < b['$'].time) {
                return -1;
            }
            else if (a['$'].time > b['$'].time) {
                return 1;
            }
            else {
                return 0;
            }
        }
        else {
            return 1;
        }
    }
    else {
        if (b.hasOwnProperty('failure')) {
            return -1;
        }
        else {
            if (a['$'].time < b['$'].time) {
                return -1;
            }
            else if (a['$'].time > b['$'].time) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }

};