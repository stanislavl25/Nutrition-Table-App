#!/bin/bash
echo "Stopping any existing node servers"
cd /htdocs/nutrition-table
sudo chown -R bitnami:bitnami
pkill node || true
nohup yarn start </dev/null &>/dev/null &
