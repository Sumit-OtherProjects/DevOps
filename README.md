# Milestone 1: Configuration Management

This milestone has helped us realize the challenges with automation and bringing together different components.

We split the whole task into smaller modules, which were taken up by each member of the team.

## Setting up Jenkins server on a VM

This task involved delpoying a Jenkins CI server on a virtual machine.

We created an ansible playbook, to add all the dependencies required for jenkins using jenking_setup.yml.

The main issue that we faced while setting up jenking , was to override the default security and skipping the setup page. Both the issues were resolved by making configuration changes in the jenkins config.xml.

We then added the required plugins using jenkins_plugin module from ansible.

## Adding oracle virtualbox and vagrant support to the VM

The subsequent tasks involved setting up a virtual machine. For this we had to install oracle virtual box and vagrant in the vm.

## Creating jenkins job to build checkbox.io application and post-build job to be executed after checkbox.io is successfully built

We setup the jenkins job by creating jenkins config.xml template. This config.xml was produced by creating a job on ui and then making changes as required. 
We used jinja template and template module on ansible, along with jenkins_job module. This created a job on the jenkins server. 
All of this was configured automatically by checkboxio_build.yml.

The second task was setting up a post-build task. We achieved this goal by triggering another job, that basically ran an ansible playbook called as checkboxio_post_build.yml.
This playbook would create a vm, and configure it to run the checkbox.io application.
