## Ansible Playbooks

Jenkins + iTrust Build Job - Abhishek Bandarupalle <br />
Checkbox + Fuzzer + Useless-Tests - Ankur Garg <br />

All relevant ansible playbooks are present in (./playbooks)[./playbooks] folder. It contains roles for each task.<br />

- checkbox: sets up jenkins build job for analysis of checkbox.io
- fuzzer: sets up and runs fuzzer on jenkins server. Number of iterations varied using vars present in ./playbooks/fuzzer/vars
- itrust: sets up build job for itrust on jenkins server
- jenkins: sets up remote machine with jenkins and any other pre-requisites required
- useless-tests: sets up jenkins build job for running useless test case detector. This build job is trigger as a post build action of itrust build job