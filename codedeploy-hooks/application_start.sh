#!/bin/bash
pkill node || true
cd /home/bitnami/htdocs/nutrition-table
npm install
npm run serve >> /home/bitnami/myapp-deploy.log 2>&1 &
