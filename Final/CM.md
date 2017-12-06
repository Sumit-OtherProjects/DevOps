## Configuration Management

Refers to the process of systematically handling changes to a system in a way that it maintains integrity over time.
Reasons:
Be able to set-up new resources with all required dependencies easily
Have a thorough record of every change to the configuration. It may be required later for audit related purposes.
Having record of all configurations may be useful when trying to provide support to a particular version of software.
Traditional vs Modern CM:
In traditional, process isn’t fully triggered until deployment. Modern, CM is integrated throughout software process.
Configuration Models: Push/Pull -> Push - central server pushes any configuration changes to all nodes. Pull -> nodes request any changes from server.
Idempotency: Same action ensures same final state.
Configuration Tools: Ansible, Puppet, Chef

Branching: Not preferred as merging can be difficult and can cause unexpected issues in final code base.

Package Managers: bower, nuget, pip, npm, maven, RubyGems, 

Task and Build Manager: make, ivy, grunt, ant

Environment Tools: Virtual Machines, VCL, EC2, Containers(Docker),  
Vagrant: interface for interacting with VMs