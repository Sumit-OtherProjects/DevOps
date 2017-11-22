# HW4-DevOps
CSC 519: DevOps Fall 2017 HW 4

[Report](./Report.md)


## Topology Implementation

In this homework, 3 express servers are used.<br />

First implements /apicontrol and /apiexperiment routes. Runs on port 5000.<br />
/apicontrol uses a "up" /ratings service and is always sucessful and returns 200.<br />
<br />
Second implements /gateway, /api,  routes. Runs on port 3000.<br />
/gateway redirects to /api with 80% probability<br />
/gateway redirects to /apicontrol with 10% probability<br />
/gateway redirects to /apiexperiment with 10% probability<br />


for /apiexperiemt -> Two scenarios were tested. <br />
It returns 500 code with a prob of 0.5. - simulating the experiment group which is interfacing with a down /ratings service and Handling it gracefully.<br />
and for remaining 0.5 probability it returns with a different error code (400) representing not being to handle ratings down gracefully.<br />


/api and /apicontrol both are interfacing with a "up" /ratings service.<br />

<br />
The third express server implements /ratings service. Runs on port 4000.<br />
it has two routes. /ratings and /ratings1<br />
/ratings always returns with 200 success code<br />
/ratings1 always returns with 500 error code<br />