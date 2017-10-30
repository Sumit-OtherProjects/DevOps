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


### Circuit Breaker Pattern
Circuit breaker is a modern design pattern used in software development to detect failures. It wraps a protected function call and the logic of preventing a failure. The circuit breaker constantly checks for failures and once the failures reach a threshold, it trips the circuit breaker and stops the protected function from constantly failing and consuming critical resources and causing cascading failure in multiple systems.<br />

Relation to Ops Toggles:
- Ops Toggles are used to control operational aspects of the system. It is usually used when rolling out a new feature. It is used to quickly disable certain features in production if needed due to high load or due to specific failures.
- In a way it is very similar to Circuit Breaker Patterns. They both serve the same purpsoe. Both are used as a way to disable certain functionality on production in case of high loads etc to prevent failure in multiple systems. 

