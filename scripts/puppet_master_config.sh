#!/bin/sh
MASTER_DNS="puppet.master.local"
MASTER_IP=192.168.33.10

echo "Modifying host file"
tee -a /etc/hosts << EOL

$MASTER_IP	$MASTER_DNS puppet
EOL

echo "\n\nConfigure PuppetLabs repossitory"

wget https://apt.puppetlabs.com/puppetlabs-release-pc1-xenial.deb
sudo dpkg -i puppetlabs-release-pc1-xenial.deb
sudo apt-get update

echo "\n\nInstall puppet-server"

sudo apt-get install -y puppetserver

echo "Modify puppet.conf"

tee -a /etc/puppetlabs/puppet/puppet.conf << EOL

[master]
dns_alt_names = $MASTER_DNS,puppet
[main]
certname = $MASTER_DNS
server = $MASTER_DNS
environment = production
EOL

echo "\n\nRestart and Enable puppet server"
sudo systemctl start puppetserver
sudo systemctl enable puppetserver
