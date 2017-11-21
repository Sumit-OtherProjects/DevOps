# DevOps Tech Talk

## Orchestration using Puppet

### Puppet Setup

We have setup Puppet in a Master-Slave mode.

We have provided two ways to do this:

- [Bash Script](https://github.ncsu.edu/akshetty/devops_techtalk_puppet/tree/master/scripts)
- [Ansible](https://github.ncsu.edu/akshetty/devops_techtalk_puppet/tree/master/ansible)

### Deploying checkbox.io on Agents

We have created Puppet module called as [run_checkboxio](https://github.ncsu.edu/akshetty/devops_techtalk_puppet/tree/master/ansible/roles/master/files/run_checkboxio) to perform orchestration on agents and deploy the application.

This module will be included in [site.pp](https://github.ncsu.edu/akshetty/devops_techtalk_puppet/blob/master/ansible/roles/master/files/site.pp) and placed inside manifest folder, so that Puppet-Server can make it available for the Puppet-Agents.


### [Walkthrough](https://www.youtube.com/watch?v=JAZOt7IV15I)

[![Walkthrough](https://www.youtube.com/watch?v=JAZOt7IV15I/0.jpg)](https://www.youtube.com/watch?v=JAZOt7IV15I)

https://www.youtube.com/watch?v=JAZOt7IV15I