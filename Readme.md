# Learning Git Screenshot

![Learning Git Screenshot](/learning-git/with_extra_credit.png?raw=true "Learning Git Tutorial Sceenshot")


# Concepts

## Continous Integeration, Continous Delivery and Continuous Deployement
Continuous integeration means that each change that is made to the code should be automatically integrated with the repository. After each change, the code is built, tested using a predefined set of tests, check performance etc. These automatic tests ensure that any change being pushed to repository doesn't break the exisintg codebase. This is a quite reliable way to ensure that any change that reaches deployement has already passed a lot of tests. 

Continuous Delivery automates the complete release process. It does everything from continuous integration and also prepares a release for production. It eliminates almost all manual tasks of building, packaging or readying a release. Only the last step is manual where someone deploys this release prepared through continuous delivery.

Continuous Deployement takes the automation one step further and deploys the release to production environment. It involved no manual task once the change is pushed to repository. It ensures integration by building the code and testing it against various tests (CI), then prepares the release for deployement and then deploys it to production.

THe difference between Cont. Delivery and Deployement is that in case od delivery, the release is not deployed to production but it is ready for deployement. Deployement is done manually. In case of Cont. deployement, it automatically deploys as well.
The both differ from Cont. Integration because in Cont. Integration, the changes are tested only for build/test stage. They are not packaged or deployed.

## Each feature is an experiment

The principle of "each feature is an experiment" means that in this age of continuous deployement, every feature/change being developed is an experiment. Based on customer response, it may be removed. Earlier (before continuous deployement), any new feature that was added was decided based on tradeoffs between multiple feature choices. This did not take into account the customer's preferences or feedback for that feature. 
In continuous deployement, any feature being planned is considered an experiment. If customers don't prefer it or use it, it will be tweaked, changed or removed.
This is mainly possible because continuous deployement makes it very fast to test some feature and get user feedback.

## Be Fast to deploy and slow to release

This principle means that every change that is to be released to user should be deployed and tested as soon as possible. Although, the two terms (release, deploy) sound quite similar, any change that is being deployed in production need not be made available to customers immediately, i.e. it need not be released right away. It can be deployed in a "hidden state" where it can be tested in live production environments for a considerable time before it is "released" to all customers. This allows engineers opportunity to test the change in production without the fear of breaking existing features. And also, makes it easier to test any small or big changes rapidly. This reduces the time to release a new feature to the users.
