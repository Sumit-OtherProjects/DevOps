## Deployment Pipeline
[pipline](./img/pipeline.png)


## Other Popular Theories/Concepts
### Every Feature is an Experiment:
The principle of "each feature is an experiment" means that in this age of continuous deployment, every feature/change being developed is an experiment. Based on customer response, it may be removed. Earlier (before continuous deployment), any new feature that was added was decided based on tradeoffs between multiple feature choices. This did not take into account the customer's preferences or feedback for that feature.    In continuous deployment, any feature being planned is considered an experiment. If customers don't prefer it or use it, it will be tweaked, changed or removed. This is mainly possible because continuous deployment makes it very fast to test some feature and get user feedback. <br />
Feature Flags, No Silos <br />
### Fast to Deploy Slow to Release:
This principle means that every change that is to be released to user should be deployed and tested as soon as possible. Although, the two terms (release, deploy) sound quite similar, any change that is being deployed in production need not be made available to customers immediately, i.e. it need not be released right away. It can be deployed in a "hidden state" where it can be tested in live production environments for a considerable time before it is "released" to all customers. This allows engineers opportunity to test the change in production without the fear of breaking existing features. And also, makes it easier to test any small or big changes rapidly. This reduces the time to release a new feature to the users.

### Difference between DevOps and NoOps Models
In a DevOps team model, the Dev team is in charge of integrating, building and deploying the code on a production like environment (usually called as staging env.). They ensure that the code is of sufficient quality for actual use by taking care of its lifecycle in staging env. The Operations team is in charge of deploying the code on staging to production env. This means that Ops team take charge of scaling and maintaining the application on production. <br />
In a NoOPs model, the Dev team need not be concerned of the underlying infrastructure/ operations. Their only concern is with the development and quality of code. The infrastructure or operations is provided to the Dev team, and they can choose to scale or modify it as per their requirement. This is similar to hosting the application in sites like Heroku. <br />
Thus the difference in architecture stems from the fact that in DevOps, a developer has responsibility to develop code as well as manage environment. In NoOps, the developer has to manage code and nothing else. <br />