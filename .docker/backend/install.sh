#!/usr/bin/env bash

rm -rf ./*

spring version

echo "-------------------------------------------------------------------"
echo "-                create spring boot project                       -"
echo "-------------------------------------------------------------------"
### Create a new Spring Boot project from an existing project.
#spring boot new --name my_project --path /var/www

### List supported dependencies
#spring initializer dependencies

### Create a new project from start.spring.io
spring initializer new --name demo --path my_project --version 0.0.1 --group nl.moukafih --artifact demo \
--description test app --package-name nl.moukafih.demo --project gradle-project --language java --boot-version 3.2.5 \
--packaging jar --java-version 17 --dependencies spring-shell devtools sentry azure-storage

#spring command new --command-name test-command

chmod -R a+rw my_project

rsync -a my_project/ ./
rm -rf my_project