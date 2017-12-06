## Circuit Breaker Pattern
Circuit breaker is a modern design pattern used in software development to detect failures. It wraps a protected function call and the logic of preventing a failure. The circuit breaker constantly checks for failures and once the failures reach a threshold, it trips the circuit breaker and stops the protected function from constantly failing and consuming critical resources and causing cascading failure in multiple systems. <br />
Circuit breakers are used to address the problem of failing remote system calls which can take up critical resources and cause cascading system failures.<br />

### Relation to Ops Toggles:
Ops Toggles are used to control operational aspects of the system. It is usually used when rolling out a new feature. It is used to quickly disable certain features in production if needed due to high load or due to specific failures.<br />
In case the a feature is causing other critical operations to slow down or break, ops toggle can be used to disable that feature without affecting the critical services.<br />
In a way it is very similar to Circuit Breaker Patterns. They both serve the same purpose. Both are used as a way to disable certain functionality on production in case of high loads etc to prevent failure in multiple systems.<br />
Ops toggles are triggered manually, through circuit breaker pattern and used to automatically handle failure and report them.<br />




## Feature Flags
### Advantages of Feature Flags
Feature Flags is DevOps practise which is used as a dark launches method to deploy new features without making them available to all users or systems.<br />
Using Feature Flags makes it easier for developers to push out new changes and test them. There are huge costs and problems associated with working on multiple long-lived branches. Using Feature Flags helps with these problems and eliminates merge problems occurring due to working on multiple branches. <br />
It can help reduce risk of failure in deployment by doing incremental releases to a particular subset of users or systems. In case of any problems identified when a feature is made available to a small number of users, it is easy to handle such problems by simply disabling such feature flags without having to deal with the risk of failure of complete software for all the users.<br />
Effectively, feature flags make it much easier to push out new features to production in a much faster way and collected feedback on such features by testing them on a small user-base.<br />
### Issues with Feature Flags
As more and more feature are added, Feature Flags can make it harder for a developer to debug the system.<br />
Keeping track of status of each of those many feature flags can make it difficult to duplicate problems.<br />
Even though, the flags help control which code is run at runtime, there is always a risk that some bug may cause untested, incomplete code may get exposed at runtime. <br />
Managing a large number of feature flags becomes quite difficult. In one instance, at a particular company, an old feature flag was somehow left in the system and was mistakenly re-used again for a different feature. When enabled, it enabled an old feature which lead to inconsistent results and it took quite some time for them to figure out what the problem was.<br />

### Alternatives: User Simulation

### Remember when using feature flags:
- Avoid Conditionals at toggle point
- Decouple decision points from decision logic
- Decouple code from feature toggling logic

### Types of Feature Flags:
- Release Toggles
- Ops Toggles
- Experiment Toggles
- Permission Toggles
<br />
Reference: https://martinfowler.com/articles/feature-toggles.html
