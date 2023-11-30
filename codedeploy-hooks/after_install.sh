#!/bin/bash
cd /home/bitnami/htdocs/nutrition-table
sudo chown -R bitnami:bitnami *
rm -rf node_modules
rm yarn.lock
sudo -u bitnami yarn install >> /var/log/myapp-deploy.log 2>&1
