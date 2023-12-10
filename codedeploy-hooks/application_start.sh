#!/bin/bash
pkill node || true
cd /home/ec2-user/nutrition-table
npm install
cross-env NODE_ENV=production node server/index.js >> /home/ec2-user/myapp-deploy.log 2>&1 &
