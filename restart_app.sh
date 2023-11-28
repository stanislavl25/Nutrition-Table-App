#!/bin/bash
echo "Stopping any existing node servers"
pkill node || true
cd /htdocs/nutritoon-table
nohup yarn start </dev/null &>/dev/null &
