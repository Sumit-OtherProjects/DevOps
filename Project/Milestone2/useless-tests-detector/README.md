## Useless Test Detector

Debosmita Das (ddas5)

Takes input directory contains the the build logs of each itrust build and generates a report of useless test cases for each of those builds. It uses all previous builds to analyze the test cases which did not fail till that build to find useless test cases. <br />

The report generated for 100th build will contain the useless test cases as required by the milestone requirements. <br />

The script has been written in Python. <br />

### How to Run
`python uselessTest.py path_to_dir_containing_build_directories`

### Requirements
No special packages required

### Report
Present in this folder named as `useless_test_report.txt`. <br />
This is the final report for 100+ commits+builds <br />