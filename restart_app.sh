#!/bin/bash
# pkill node || true
cd /home/bitnami/htdocs/nutrition-table
sudo chown -R bitnami:bitnami *
rm -rf node_modules
rm yarn.lock
npm install >> /var/log/myapp-deploy.log 2>&1
# yarn
# nohup yarn start </dev/null &>/dev/null &
