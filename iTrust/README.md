## Challenges faced:

1. Installing mysql with custom password and then executing mvn package was quite challenging.
2. To avoid this issue we updated password for mysql server through ansible playbook debconf command
3. We changed password in context.xml file as well.
4. We updated the configuration file my.cnf for MySQL with the following and removed all other specifications:
  [mysqld]
  lower_case_table_names = 1
  !includedir /etc/mysql/conf.d/
This helped us in running maven after mysql installation and we could do away with any access issue that we faced while deploying iTrust.

## Steps for iTrust.yml:
The playbook iTrust.yml will do the following:
1. Ask for github user id and password
2. Install Java
3. Agree to the oracle terms and conditions
4. Install Maven
5. Install MySQL package dependancies
6. Change password for MySQL
7. Start MySQL server
8. Install MySQL-python
9. Download and unzip Tomcat
10. Restart MySQL service
11. Install git
12. Clone git repo of iTrust --> http://github.ncsu.edu/engr-csc326-staff/iTrust-v23.git
13. Execute mvn package command in the folder iTrust-v23/iTrust
14.  Now in same file execute the command mvn tomcat7:deploy to deploy Tomcat

## Screencast:
https://www.youtube.com/watch?v=W9ifdHyEBaI&feature=youtu.be⁠⁠⁠⁠
