# Git Hooks Screenshot


# Concepts

##Each feature is an experiment

The principle of "each feature is an experiment" means that in this age of continuous deployement, every feature/change being developed is an experiment. Based on customer response, it may be removed. Earlier (before continuous deployement), any new feature that was added was decided based on tradeoffs between multiple feature choices. This did not take into account the customer's preferences or feedback for that feature. 
In continuous deployement, any feature being planned is considered an experiment. If customer's don't prefer it or use it, it will be tweaked, changed or removed.
This is mainly possible because continuous deployement makes it very fast to test some feature and get user feedback.

##Be Fast to deploy and slow to release

This principle means that every change that is to be released to user should be deployed and tested as soon as possible. Although, the two terms sound quite similar, any change that is being deployed in production need not be made available to customers immediately. It can be deployed in a "hidden state" where it can be tested in live production environments for a considerable time before it is "released" to all customers. This allows engineers opportunity to test the change in production without th fear of breaking existing features. And also, makes it easier to test any small or big changes rapidly. This reduces the time to release a new feature to the users.
