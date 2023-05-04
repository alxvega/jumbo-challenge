#!/bin/bash

# Start Xvfb and set the DISPLAY environment variable
Xvfb :99 -screen 0 1920x1080x16 > /dev/null 2>&1 &
export DISPLAY=:99

# Execute the node script
node main.js