# A Tale of Fuzzer

## Prerequisites

### Environment Variables

USER        --> Git username

KEY         --> Git Personal Token

LOCALPATH   --> Where the git repo will be cloned

ITERATIONS  --> Number of Iteration, default is 100

Required but not added yet

Any token or url for jenkins

### How to run

Just trigger 'node runFuzzerJob'

This will trigger ITERATIONS number of commits and jenkins build job for each commit.

### Integration:
Run the fuzzer.js. - it will create 100 commits. Each commit triggers a build for itrust build job (this job will have a post build job attached to it). After each build job finishes.. trigger a post build (for both failure and sucess) to trigger another job (useless test detector) - which will just run a python file to generate a report of useless test cases.

### Things to add

Need to add curl command to execute jenkins build in the method triggerJenkinsJob(commitID)

The commitID is the token generated when we commit, the jenkins job will need to checkout this commit and run maven test on that commit.

This is very important.

Because we are reverting changes after every commit.

i.e.

commit1

revert commit1

commit2

revert commit2

So the HEAD will always be a clean copy, and will successfully pass maven test.

The jenkins job needs to be a parameterized build

It should take parameter as commitID, then  run following commands

git checkout 'commitID'

mvn test or mvn package


Then trigger a post-build that will trigger test analysis.

This is because we need build number to check which test reports to analyze.
