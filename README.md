# HW3 - Ankur Garg (agarg12)

## Screencast

[![HW3 Screencast](https://img.youtube.com/vi/uQhOO8tsRvs/0.jpg)](https://www.youtube.com/watch?v=uQhOO8tsRvs)

https://www.youtube.com/watch?v=uQhOO8tsRvs

## Conceptual Questions

### Advantages of Feature Flags
Feature Flags is DevOps practise which is used as a dark launches method to deploy new features without making them available to all users or systems.<br />
Using Feature Flags makes it easier for developers to push out new changes and test them. There are huge costs and problems asociated with working on multiple long-lived branches. Using Feature Flags helps with these problems and eleminates merge problems occurriing due to working on multiple branches. <br />
<br />
It can help reduce risk of failure in deployement by doing incremental releases to a particular subset of users or systems. In case of any problems identified when a feature is made available to a small number of users, it is easy to handle such problems by simply disabling such feature flags without having to deal with the risk of failure of complete software for all the users.<br />
Effectively, feature flags make it much easier to push out new features to production in a much faster way and collected feedback on such feaures by testing them on a small userbase.<br />

### Issues with Feature Flags
As more and more feature are added, Feature Flags can make it harder for a developer to debug the system.<br />
Keeping track of status of each of those many feature flags can make it difficult to duplicate problems.<br />
Even though, the flags help control which code is run at runtime, there is always a risk that some bug may cause untested, incomplete code may get exposed at runtime. <br />
<br />
Managing a large number of feature flags becomes quite difficult. In one instance, at a particular company, an old feature flag was somehow left in the system and was mistakenly re-used again for a different feature. When enabled, it enabled an old feature which lead to inconsistent results and it took quite some time for them to figure out what the problem was.<br />
<br />

### Reasons for keeping Servers in Seperate Availability Zones
One of reasons for having multiple servers spread over different geographical locations is to be able to provide services and content at a faster rate to users in different locations. For serving content to a user from a particular location, servers closest to that lcoation are used to ensure the content is made available to the users fast. It also provides the ability to customize the type of content availabile to users accessing the service from different locations.<br />
It is a usual practice to have multiple servers in different availability zones. It is done to protect service availability against any events which may cause disruption to service for a particular server. Such events could be like natural disasters, power outages or any other type of event which can cause distruption to service in a particular area. Servers in separate availability zones helps ensure that service doesn't fail completely because of such an event in a particular region. <br />
It can also be useful in cases of high service load in a particular region. In such a scenario, service request traffic can be redirected to other regions to avoid over-load.


### Circuit Breaker Pattern
Circuit breaker is a modern design pattern used in software development to detect failures. It wraps a protected function call and the logic of preventing a failure. The circuit breaker constantly checks for failures and once the failures reach a threshold, it trips the circuit breaker and stops the protected function from constantly failing and consuming critical resources and causing cascading failure in multiple systems.<br />

Circuit breakers are used to address the problem of failing remote system calls which can take up critical resources and cause cascading system failures.

Relation to Ops Toggles:
- Ops Toggles are used to control operational aspects of the system. It is usually used when rolling out a new feature. It is used to quickly disable certain features in production if needed due to high load or due to specific failures.
- In case the a feature is causing other critical operations to slow down or break, ops toggle can be used to disable that feature without affecting the cirtical services.
- In a way it is very similar to Circuit Breaker Patterns. They both serve the same purpsoe. Both are used as a way to disable certain functionality on production in case of high loads etc to prevent failure in multiple systems. 
- Ops toggles are triggered manually, though circuit breaker pattern and used to automatically handle failure and report them.

### Ways to speed up an application
1. Traffic peaks on monday evenings <br />
Use Load Balancing. For certain time, when load is high, spawn new instances for handling extra load. This scaling can happend automatically based on number of requests being served at any moment and current performance of the server. <br/>
Avoid slow spin-up for new instances. <br />
Apart from this, some simple ways to free up server resources like not using CPU resources for static requests, can help free up critical resources which can handle more load. Use separate environment for rendering static content.<br />
2. Real time and concurrent connection with peers<br />
Create Multiple Servers in Separate availability zones. Use Smart DNS to find the closest server to serve the request. This will reduce latency in processing service requests. Use Latency based routing.<br />
3. Heavy Uplaod traffic<br />
Use reverse proxy servers like nginx. They are highly scalable. Frees up application server for just handling requests instead of directly serving them. Along with this load balancing can be used to spin up new instances to handle load as per requirements.<br />
