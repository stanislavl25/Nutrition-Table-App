#!/bin/bash
sudo -u bitnami nohup yarn start >> /var/log/myapp-deploy.log 2>&1
