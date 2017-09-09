# Setting up Mini-VCL

The ansible script config/setup_server.yml sets up a new headless Ubuntu 16.04 machine.
It required an inventory file with a variable "nodes" and username and password for that machine.
A sample inventory file has been added in config/ folder.
Please replace variables with the ip address, username and password of the machine where this mini-VCL is to be setup


# Provisioning new VM

To Provision a new VM using ansible - the script config/provision.yml is used.
It uses vagrant to set up a new ubuntu/trusty32 machine inside the mini-VCL server.
It creates a new unique folder and then copies a Vagrantfile into it and then runs vagrant up.

# Templates
Some templates required for setting up virtualbox and phpvirtualbox are present in templates/ folder
A template vagrant file is also present which is used to provision a new VM using vagrant.


# Screencast

[![Mini-VCL Setup and Provisioning new VM Screencast](https://img.youtube.com/vi/q_w4eByGdx4/0.jpg)](https://www.youtube.com/watch?v=q_w4eByGdx4)

https://www.youtube.com/watch?v=q_w4eByGdx4