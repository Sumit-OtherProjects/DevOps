#!/bin/sh
CLIENT_DNS="puppet.agent.local"
CLIENT_IP=192.168.33.11
MASTER_DNS="puppet.master.local"
MASTER_IP=192.168.33.10

echo "Modifying host file"
tee -a /etc/hosts << EOL

$MASTER_IP	$MASTER_DNS puppet
$CLIENT_IP	$CLIENT_DNS
EOL

echo "\n\nConfigure PuppetLabs repossitory"

wget https://apt.puppetlabs.com/puppetlabs-release-pc1-xenial.deb
sudo dpkg -i puppetlabs-release-pc1-xenial.deb
sudo apt-get update

echo "\n\nInstall puppet-agent"

sudo apt-get install -y puppet-agent

echo "Modify puppet.conf"

tee -a /etc/puppetlabs/puppet/puppet.conf << EOL

[main]
certname = $CLIENT_DNS
server = $MASTER_DNS
environment = production
EOL

echo "\n\nRestart puppet service"
sudo /opt/puppetlabs/bin/puppet resource service puppet ensure=running enable=true

echo "\n\nRegister with master"
sudo /opt/puppetlabs/bin/puppet agent --test
