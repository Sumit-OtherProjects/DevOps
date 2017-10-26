## Fuzzer

Atit Shetty (akshetty)


## Cusomtizable Variables

USER        --> Git username - vars prompt by ansible <br />
KEY         --> Git Personal Token - vars prompt by ansible <br />
ITERS  		--> Defined in ansible script under ../playbooks/fuzzer/vars/main.yml <br />

### How to run
Run `node runFuzzerJob.js` <br />

This will trigger `ITERS` number of commits and jenkins build job for each commit.

### Details:
It will create `ITERS` commits. Each commit triggers a build for itrust build job (this job has a post build job attached to it). After each build job finishes.. a post build (for both failure and sucess) is triggered which starts another build job (useless test detector) - which runs a python file to generate a report of useless test cases.
