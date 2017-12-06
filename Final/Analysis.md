## Analysis
Automated discovery of “issues”

- Static analysis: Check code without executing it.
- Program Analysis: Data Flow Analysis
- Dynamic Analysis: Performance, Memory, Taint Analysis - Tools like valgrind. Coverage.
- Statistical Tests: Use statistical properties to detect suspicious lines of code.
- Randomized Testing (Randoop) & fuzzing (Test Generation)

<br />
Smells: Long method, Duplicate Code, Message Chain Lengths, Long Parameter list, etc.<br />
<br />
<u>Ways to detect duplicate Code:</u>
- Use Abstract Syntax Trees (example: using esprima for javascript code)
- Use Locality-Sensitive Hashing
- Count Matrix Clone Detection
<br />
Detecting long method: use abstract syntax trees to get lines of code for each method. <br />
Loop Depth of Function: check for for/forin/while statement using esprima and then check depth. Do this recursively to get max depth of function.<br />


<u>Data Flow Analysis:</u>
- Framework to prove facts about a program
- Definition: where variable changes
- Use: where variable is used
- Definition in node 1 reaches node2 if it follows a path without any definitions.

Uses cases for static analysis:<br />
- Better structure code. Detect long methods or methods with high complexity.
- Detect simple bugs early.
- Detect duplicate code.

<u>Issues and Benefits related to static analysis</u>
Benefits:
- No need to run the code before checking for errors.
- Can help find a lot of trivial mistakes relating to spell checks, coding guidelines, etc.
- Can help remove duplicate code.
Issues: 
- Not enough. Need to run dynamic analysis for measuring code coverage.
- Can’t detect runtime issues like uninitialized variables, 

Coverage Subsumption: One type of coverage suffificent to prove different type of coverage. Branch-Coverage subsumes statement coverage.<br />
Other kinds of coverage: path coverage, condition coverage, data-flow coverage.<br />