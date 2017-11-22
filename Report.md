# Homework 4 - Report

## Purpose of Chaos Experiment

The objective is to test how an application (or a particular service) - in this case /api performs if another service (/ratings) on which this /api depends, fails. <br />

But while conducting such an experiment in real scenario, we woudn't want to actually kill the /ratings service because that would affect all the users using the application.<br />

So, in fact, we run this experiment on a small portion of all the users. In this case 10%.<br />

Out of this 10% , half is used as a control group for baseline and half is used for experiment in which we simulate the rating service going down.<br />

Based on the results from control and experiment group we can analyze, how well is our application handling the /rating service being down.<br />


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
and for remaining 0.5 probability it returns with a different error code (400) representing not being to handle ratings gracefully.<br />


/api and /apicontrol both are interfacing with a "up" /ratings service.<br />

<br />
The third express server implements /ratings service. Runs on port 4000.<br />
it has two routes. /ratings and /ratings1<br />
/ratings always returns with 200 success code<br />
/ratings1 always returns with 500 error code<br />

## Experiment Implementation
analysis.js implements a script to run the experiment. <br />
It sends 1000 requests to the /gateway<br />
And based on the messages and error codes returned prepares statistics each group.<br />

In case, no response is returned by gateway, it prints a messages "API Service can not handle ratings going down" as it signifies that for some reason, an error occurred and server wasn't able to handle it properly.<br />

Finally it prints statistics about each group, how many requests were handled by each /api group and how many of those were processed sucessfully and how many of them were handled gracefully.<br />


### Experiment Settings
I tried running two scenarios. First in which the apiexperiment doesn't handle the failure gracefully, and one where it does.<br />

When it does, it basically returns 500 err code.<br />

When it doesn't, it just assumes correct response from /ratings service and tries to use that response and ends up returning 400 error code. In such a scenario, the analysis.js prints the message and stops sending any more requests to server.<br />


In the second scenario when it gracefully handles it, the analyis.js keeps logging the relevant statistics and completes the 1000 requests and then prints statitics.<br />

## Observations
This is useful method to test the application against specific scenarios without disrupting the majority of users.<br />

The results compiled by the analysis.js<br />

-------- For API -------------<br />
Handled:  804<br />
Successful:  804<br />
Gracefully Handled:  0<br />
-------- For API CONTROL -------------<br />
Handled:  100<br />
Successful:  100<br />
Gracefully Handled:  0<br />
-------- For API EXPERIMENT -------------<br />
Handled:  96<br />
Successful:  0<br />
Gracefully Handled:  46<br />
Gracefully Not Handled:  50<br />

Here we can see that in case of API experiment, around 50% requests are handled gracefully and 50% are not.<br />
Overall 80% of the requests are still handled by /api<br />
and 10% are handled by api control which is using "up" ratings service, so is always sucessful<br />


## Experiences:
- Simluating "not being able to handle ratings down gracefully" was a bit tricky without actually killing the server. <br />
- In a real scenario, apicontrol would useful in determining whether apiexperiment is at par with it or not. Because in a "real scenario" we won't really be using http error codes to analyse the experiment results, we would be using real time user based metrics like up time per user etc, to determine the "effects" of this experiment.<br />
	- In this homework, /apicontrol doesn't play much part as we don't have such metrics and we directly use the logs/messages to determine the paths and status of each request.<br />
