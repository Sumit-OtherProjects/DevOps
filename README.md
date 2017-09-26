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

Some of the challenges involved were creating user for mongodb, creating config file for deploying checkbox.io on nginx, and creating service for mongodb that will be enabled from bootup.

## Creating jenkins job to build itrust application and post-build job.

In order to build itrust application, we required java and maven. The ansible script build-job-itrust.yml, provided all the dependecies to create a jenkins job that will do a maven build of iotrust application.

The main issue while creating this jenkins job was providing a way to ask for github credentials. We accomplished this by using vars_prompt feature of ansible.

The second task was creating a post build job that will run this application.

### Challenges faced:

Installing mysql with custom password and then executing mvn package was quite challenging.
To avoid this issue we updated password for mysql server through ansible playbook debconf command
We changed password in context.xml file as well.
We updated the configuration file my.cnf for MySQL with the following and removed all other specifications: [mysqld] lower_case_table_names = 1 !includedir /etc/mysql/conf.d/ This helped us in running maven after mysql installation and we could do away with any access issue that we faced while deploying iTrust.
Steps for iTrust.yml:

### The playbook iTrust.yml will do the following:

Ask for github user id and password
Install Java
Agree to the oracle terms and conditions
Install Maven
Install MySQL package dependancies
Change password for MySQL
Start MySQL server
Install MySQL-python
Download and unzip Tomcat
Restart MySQL service
Install git
Clone git repo of iTrust --> http://github.ncsu.edu/engr-csc326-staff/iTrust-v23.git
Execute mvn package command in the folder iTrust-v23/iTrust
Now in same file execute the command mvn tomcat7:deploy to deploy Tomcat

### Screencast:
https://www.youtube.com/watch?v=W9ifdHyEBaI&feature=youtu.be⁠⁠⁠⁠


## Contributions:

### Abhimanyu Jataria (ajataria)

Involved with creating jenkins setup and post-build script to run itrust. Resolved multiple issues with setup of maven and tomcat, along with their integration.

### Ankur Garg (agarg12)

Resolved issues with jenkins setup like bypassing setup screen and installing plugins from ansible. Created build job for itrust application and worked towards integrating post build job of checkbox.io with ansible.

### Debosmita Das (ddas5)

Resolved issues with initial jenkins setup and worked towards creating post-build job for itrust application. Found solutions for problems related to tomcat and mysql.

### Atit Shetty (akshetty)

Tinkered over problems with user authetication in jenkins. Created build jobs for checkbox.io and wrote post-build script for deploying checkbox.io on nginx. Worked towards integrating both the jobs using ansible.
