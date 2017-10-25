# CSC5198 - Devops-milestone2
Devops 2 Milestone Testing
### Team Members:
    Debosmita Das(ddas5)
    Abhishek Bandarupalle(abandar)
    Ankur Garg(agarg12)
    Abhimanyu Jataria(ajatari)
    Atit Shetty(akshetty)

## Ansible Playbooks
All relevant ansible playbooks are present in (./playbooks)[./playbooks] folder.
It contains roles for each task.
- checkbos: sets up jenkins build job for analysis of checkbox.io
- fuzzer: sets up and runs fuzzer on jenkins server. Number of iterations varied using vars present in ./playbooks/fuzzer/vars
- itrust: sets up build job for itrust on jenkins server
- jenkins: sets up remote machine with jenkins and any other pre-requisites required
- useless-tests: sets up jenkins build job for running useless test case detector. This build job is trigger as a post build action of itrust build job

## Fuzzer 
fuzzer scripts are present in [./fuzzer](./fuzzer) folder.
It takes a directory path and randomly selects a sample list, and modifies them.

runFuzzerJob.js will clone the itrust module, call fuzzer.js and commit the changes.

After commiting changes, trigger a jenkins build.

### Itrust fork

https://github.ncsu.edu/akshetty/iTrust-v23

branch : fuzzer

## Useless Test Detector
Takes input directory contains the the build logs of each itrust build and generates a report of useless test cases for each of those builds.
It uses all previous builds to analyze the test cases which did not fail till that build to find useless test cases.

The report generated for 100th build will contain the useless test cases as required by the milestone requirements.

The script has been written in Python.

## Analysis 
The code is [./analysis](./analysis) folder. The script main.js is the analysis script. It takes input the directory containing the server-side code of checkbox.io. It runs analysis on each .js file recursively found in this given directory. <br />
For each of these files, it runs analysis on each function. It checks the four criteria mentioned in Milestone 2 question. <br />
The report is generated in xml format. One such report has also been generated in txt format. <br />
Both reports are present at links: ![here](./analysis/analysis.txt) in txt format and [here](./analysis/analysis_report.xml) in xml format

### Screencast:

### Checkbox
[![Screencast for Analysis (Checkbox.io) Component](https://img.youtube.com/vi/nRk9pbon4hc/0.jpg)](https://www.youtube.com/watch?v=nRk9pbon4hc)

https://www.youtube.com/watch?v=nRk9pbon4hc

### Jenkins + iTrust + Fuzzer
[![Screencast Jenkins Setup, Fuzzer, Useless Test Case Detector, iTrust Build](https://img.youtube.com/vi/tHE7xmkeWMA/0.jpg)](https://www.youtube.com/watch?v=tHE7xmkeWMA)

https://www.youtube.com/watch?v=tHE7xmkeWMA

## Contributions

Atit Shetty:
- Developing core Fuzzer code and Integration with git

Debosmita Das:
- Useless Test Detector

Abhimanyu Jataria
- Jenkins Setup and Itrust Build Job

Abhishek Bandarupalle
- Jenkins Setup and Itrust Build Job

Ankur Garg (agarg12):
- Analysis Script for checkbox.io for static analysis
- Integration of Analysis script with jenkins build job and Useless Test Detector as a post build job of Itrust build job
- Ansible script for fuzzer to run fuzzer on jenkins server
- Ansible Scripts for creating Build jobs of Useless test detector and analysis script
