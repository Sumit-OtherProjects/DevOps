# Test Suites

## Setup

Inside the simplecalc directory, run `mvn test`. You should see test results. You can inspect the resulting files produced by the surefire plugin, in target/superfire-reports.

Stepping one directory back up from the simplecalc directory, run `npm install`, then `node main.js`.

You should see the printout of the test suite file:

```
{ testsuite: 
   { '$': 
      { tests: '6',
        failures: '1',
        name: 'com.github.stokito.unitTestExample.calculator.CalculatorTest',
        time: '9.858',
        errors: '0',
        skipped: '0' },
     properties: [ [Object] ],
     testcase: [ [Object], [Object], [Object], [Object], [Object], [Object] ] } }
Done
```

## Test prioritization

Print a ranked list of the test cases based on test to execute and test faiilure.

## Flaky tests

One of the tests is flaky. Extend the code to run `mvn test` several times (10--20), and each run, collection statistics about failing and passing tests. See if you can calculate a "flakyness" score for each test case.