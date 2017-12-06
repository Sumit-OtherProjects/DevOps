## Testing

Unit Tests -> Integration Tests -> System Testing -> Acceptance Testing <br />

There can be large number of tests in the test framework for a big project. Need ways to reduce the overhead of running test cases after each build. Especially in current scenario of Continuous Integration. It can take hours to run all test cases.<br />
<br />
#### How to Prioritize Test cases:
- Random order ?
- Time since last failure
- Test coverage
- Order by cost to run the test and severity of fault in case of failure.

#### Ways to reduce testing time:
- Prioritize Test Cases
- Find a possible subset of tests which may be affected by current change and run only those test cases. (Google)

#### Flaky Test Cases:<br />
Tests with non deterministic output. May Fail or Pass with same code base. Make it harder to reproduce the bugs. Undermines the usability of test suite and cause delay in development process.<br />

#### Reasons for Flaky Test Cases:<br />
- Concurrent process accessing same data.
- Asynchronous calls
- Floating point operations
- Other system related problems with network, resources etc.

#### Other forms to testing:
- Load testing, squeeze testing, longevity testing, Resilience testing, Security testing etc.

Automatic test case generation - generate test cases automatically<br />
Mutation Testing - change the test cases based on existing test cases<br />
Fuzzing - randomly change test cases<br />
Bug Prediction - predict where in the code is a possible bug and notify developer.<br />

### Squeeze Test:
It is to run some tests/benchmarks to see changes in performance and calculate the breaking point of the application. Then see if that last change was inefficient or determine the recommended auto-scaling parameters before deploying it.

### Automated Squeeze Test:
Once the canary has passed the functional and ACA analysis phases the production traffic is differentially steered at an increased rate against the canary, increasing in well-defined steps. As the request rate goes up key metrics are evaluated to determine effective carrying capacity; automatically determining if that capacity has decreased as part of the push.

#### Tools
Test Generation in Java - Randoop<br />
Coverage in Java - Emma<br />