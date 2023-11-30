#!/bin/bash
pkill node || true
cd /home/bitnami/htdocs/nutrition-table
nohup yarn start </dev/null &>/dev/null &
