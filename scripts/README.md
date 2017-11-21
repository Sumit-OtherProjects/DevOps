
# Instructions for Installation

1. Create an Ubuntu Xenial 64-bit machine, designated as "Puppet Master" or "master". This should ideally have 4 GB of RAM.

2. Open ```puppet_master_config.sh``` in the master and change the value of ```MASTER_IP``` to reflect the IP of that system.

3. Then run ```puppet_master_config.sh``` in this master.

4. Once done, go to another Ubuntu Xenial 64 machine, designated as "Puppet Agent" or "agent".

5. Open ```puppet_agent_config.sh``` in the agent and change value of ```CLIENT_IP``` to reflect the IP of that system. Also change value of ```MASTER_IP``` to reflect IP of the master.

6. Then run it as a sudo user.

7. Once the whole process is completed, return to master and run

``` sudo /opt/puppetlabs/bin/puppet cert sign --all ```

8. In the master copy the ```site.pp``` file in location ```/etc/puppetlabs/code/environments/production/manifests```.
   This has code to create folder in the agent.

8. Everything is done. To verify, go to agent and run

``` sudo /opt/puppetlabs/bin/puppet agent --test ```

9. You should also see a folder by the name ```puppetdir``` in ```/tmp```. This was created by master in the agent.

This should output something like this:

 ```
Info: Caching certificate for puppet.agent.local
Info: Caching certificate_revocation_list for ca
Info: Caching certificate for puppet.agent.local
Info: Using configured environment 'production'
Info: Retrieving pluginfacts
Info: Retrieving plugin
Info: Caching catalog for puppet.agent.local
Info: Applying configuration version '1511035876'
```

### References

http://www.itzgeek.com/how-tos/linux/ubuntu-how-tos/how-to-install-puppet-on-ubuntu-16-04.html

https://www.digitalocean.com/community/tutorials/how-to-install-puppet-to-manage-your-server-infrastructure

https://www.digitalocean.com/community/tutorials/getting-started-with-puppet-code-manifests-and-modules
