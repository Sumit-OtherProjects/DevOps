# devops-milestone2
Devops 2 Milestone Testing

## Itrust fork

https://github.ncsu.edu/akshetty/iTrust-v23

branch : fuzzer


## Fuzzer progress

fuzzer.js has main method that takes a directory path and randomly selects a sample list, and modifies them.

runFuzzerJob.js will clone the itrust module, call fuzzer.js and commit the changes.

### Things to add

1) add mvn compile step to verify if the changes are proper.
2) If the changes are proper, commit them else revert the changes.
3) After commiting changes, trigger a jenkins build and moonitor it.


## Analysis Progress
main.js contains the code to detect all 4 things required
- Number of lines of code for each function
- Big O of each function
- Max Message chain length of each function 
- Number of Sync Calls in each function

For now it takes the name of the target files by hardocding them into the code.

### Things to Add
Just give directory of server-code of checkbox.io as input and recursively find all files and run analysis for each file.
Print out the report in a particular format. Preferably XML.

