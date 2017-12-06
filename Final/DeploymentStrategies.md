## Deployment Strategies

Staging: first test the changes in a ‘production-like’ environment.<br/>
Bake and Test<br/>
Waterfall Staging: Series of Incrementally expensive testing performed at each staging level.<br/>
Manual Code review by People.<br/>

### How to deploy ? rsync ? ansible/chef/puppet ? git push ?

- Green/Blue:
	- Keep two identical copies of infrastructure. Incrementally build up second version and switch when ready. - High cost of infrastructure. Data Migration may be costly.

- Dark Launches: (Instagram)
	- Integrate as soon as possible. Release small changes to production in the background. Collect statistics about its scalability and performance. Helps in testing incremental changes in production environments. Can minimize risk as compared to deploying a major update to production all at once.
	- Deploy to production directly but don’t expose new code features to users. Test in production environment for long time before finally “releasing” to users.
	- Usually done using feature flags. - some drawbacks of feature flags (above)

- Ring Deployment (Microsoft):
	- Release to limited group of customers at a time. Multiple rings define the various groups of customers. Incrementally release to each ring and rollback and fix if any issues detected. Helps minimize exposure of issues to important customers by identifying majority of issues in lower rings.

- Rolling Update:
	- Make updates to one server at a time so that service is never completely down.
	- Can do DB schema changes without going offline. But application can be in “mixed” mode till the deployment is finished.

- Evolutionary Database Design
	- DBA collaborate with developers actively.
	- Database artifacts are version controlled
	- All database changes are migrations.
	- Everybody gets their own database instance.
	- Developers continuously integrate database changes.
	- Transition Phase

- Expand / Contract. (Database Migration)

- Canary Releasing: Rolling back is easy. Shared resources need to word with all versions in production. May be supporting multiple versions in production.

- Operation Locks: Manually lock down parts of production systems while performing deployment.