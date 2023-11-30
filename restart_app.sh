#!/bin/bash
echo "AfterInstall hook started" >> /var/log/myapp-deploy.log
pkill node || true
cd /home/bitnami/htdocs/nutrition-table
sudo chown -R bitnami:bitnami *
rm -rf node_modules
rm yarn.lock
yarn install
yarn
nohup yarn start </dev/null &>/dev/null &
echo "AfterInstall hook finished" >> /var/log/myapp-deploy.log
