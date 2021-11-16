#!/bin/sh
echo "removing imi-standalone-toolbox-ui website files..."
rm -rf /var/www/toolbox/imi-standalone/*
if [ $? -eq 0 ]; then
  echo "successfully removed imi-standalone-toolbox-ui website files."
else
  echo "failed to remove imi-standalone-toolbox-ui website files."
fi
