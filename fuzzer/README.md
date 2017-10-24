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

This will trigger ITERATIONS number of commits and jenkins build job

### Things to add

Need to add curl command to execute jenkins build in the method triggerJenkinsJob(commitID)

The commitID is the token generated when we commit, the jenkins job will need to checkout this commit and run maven test on that commit.

This is very important.

Because we are reverting changes after every commit.
So the HEAD will always be a clean copy, and will successfully pass maven test.
