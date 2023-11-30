#!/bin/bash
pkill node || true
cd /home/bitnami/htdocs/nutrition-table
sudo -u bitnami nohup yarn start >> /var/log/myapp-deploy.log 2>&1 &
