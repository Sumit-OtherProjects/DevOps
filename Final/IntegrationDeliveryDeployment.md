## Continuous Integration / Continuous Deployment / Continuous Delivery

Continuous integration means that each change that is made to the code should be automatically integrated with the repository. After each change, the code is built, tested using a predefined set of tests, check performance etc. These automatic tests ensure that any change being pushed to repository doesn't break the existing codebase. This is a quite reliable way to ensure that any change that reaches deployment has already passed a lot of tests.<br />
<br />
Continuous Delivery automates the complete release process. It does everything from continuous integration and also prepares a release for production. It eliminates almost all manual tasks of building, packaging or readying a release. Only the last step is manual where someone deploys this release prepared through continuous delivery.<br />
<br />
Continuous Deployment takes the automation one step further and deploys the release to production environment. It involved no manual task once the change is pushed to repository. It ensures integration by building the code and testing it against various tests (CI), then prepares the release for deployment and then deploys it to production.<br />
<br />
The difference between Cont. Delivery and Deployment is that in case of delivery, the release is not deployed to production but it is ready for deployment. Deployment is done manually. In case of Cont. deployment, it automatically deploys as well.
The both differ from Cont. Integration because in Cont. Integration, the changes are tested only for build/test stage. They are not packaged or deployed.