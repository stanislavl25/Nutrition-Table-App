#!/bin/bash
pkill node || true
nohup yarn start --cwd /home/bitnami/htdocs/nutrition-table </dev/null &>/dev/null &
