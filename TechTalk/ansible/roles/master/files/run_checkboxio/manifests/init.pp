# Class: run_checkboxio
# ===========================
#
# This will install checkbox.io application on Puppet agents.
#
#
# Authors
# -------
#
# Author Name <akshetty@ncsu.edu>
#
# Copyright
# ---------
#
# Copyright 2017 Atit Shetty
#
class run_checkboxio {
  include apt
  include stdlib
# include vcsrepo

  apt::source { 'mongodb-org-3.4':
    architecture => 'amd64,arm64',
    location => 'http://repo.mongodb.org/apt/ubuntu',
    release => 'xenial/mongodb-org/3.4',
    repos => 'multiverse',
    key      => {
      'id'     => 'EA312927',
      'server' => 'keyserver.ubuntu.com',
    },
    include  => {
      'deb' => true,
    },
    ensure => 'present',
  }

  exec { 'apt-update':  
    command => '/usr/bin/apt-get update'
  }

  package{['mongodb','nginx','nodejs','build-essential','git','npm','python-pip']:
    ensure => 'installed',
    install_options => ['--allow-unauthenticated', '-f'],
    require => Exec['apt-update'],
   }

  file{'Create symbloc link node for nodejs':
    path => '/usr/bin/node',
    ensure => 'link',
    target => '/usr/bin/nodejs',
  }

  file{'Create mongod service':
    path => '/etc/systemd/system/mongodb.service',
    source => 'puppet:///modules/run_checkboxio/mongodb.service',
    ensure => present,  
  }

  service{'Start mongodb service':
    name => 'mongodb',
    ensure => 'true',
    enable => 'true',
    subscribe => File['/etc/systemd/system/mongodb.service'],  
  }

  exec{'Add admin user to mongodb':
    command => 'mongo --eval "db.getSiblingDB(\'admin\').addUser(\'admin\', \'passwd\');" && mkdir -p /etc/mongo_admin',
    provider => 'shell',
    creates => '/etc/mongo_admin',
  }

  file{'Copy environment variables':
    path => '/etc/profile.d/env_variables.sh',
    source => 'puppet:///modules/run_checkboxio/env_variables.sh',
    ensure => present,
  }

  exec{'Source /etc/environment':
    command => '. /etc/profile.d/env_variables.sh',
    provider => 'shell',
  }

  vcsrepo{'Clone checkboxio':
    path => '/etc/git/checkbox.io',
    provider => 'git',
    ensure => 'latest',
    source => 'https://github.com/chrisparnin/checkbox.io.git',
    revision => 'master',
  }

  exec{'Install npm packages for checbox.io':
    command => 'npm install --prefix /etc/git/checkbox.io/server-side/site/',
    provider => 'shell'
  }

  exec{'Install forever to run checbox.io server':
    command => 'npm install -g forever',
    provider => 'shell',
  }

  file{'Overwrite nginx.conf':
    path => '/etc/nginx/nginx.conf',
    source => 'puppet:///modules/run_checkboxio/nginx.conf',
    ensure => present,
  }

  file{'Overwrite nginx default':
    path => '/etc/nginx/sites-available/default',
    source => 'puppet:///modules/run_checkboxio/default',
    ensure => present,
  }

  service{'Restart nginx':
    name => 'nginx',
    ensure => 'true',
    enable => 'true',
    subscribe => File['/etc/nginx/nginx.conf'],  
  }

  exec{'stop all previous version':
    command => 'forever stopall',
    provider => 'shell',
  }

  exec{'Start checkboxio':
    command => 'forever start server.js',
    cwd => '/etc/git/checkbox.io/server-side/site/',
    provider => 'shell',
  }
}
