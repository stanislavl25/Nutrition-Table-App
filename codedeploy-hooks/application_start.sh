#!/bin/bash
pkill node || true
cd /home/bitnami/htdocs/nutrition-table
yarn install
yarn start >> /home/bitnami/myapp-deploy.log 2>&1 &
