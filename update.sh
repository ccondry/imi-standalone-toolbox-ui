#!/bin/sh
# this file is meant to be run from cron to update the local git branch with the
# associated upstream branch, then restart the service

# fetch changes from origin
git fetch
# get the number of changes between local and remote (current branch)
CHANGES=$(git rev-list HEAD...@{u} --count)

# check if changes need to be pulled in
if [ $CHANGES = "0" ]; then
  # no changes - exit after this
  echo "git repo is current"
else
  # there are repo updates in remote
  echo "git repo is not current. updating..."
  git pull
  # check if git pull worked
  if [ $? -eq 0 ]; then
    echo "running yarn"
    yarn
    if [ $? -eq 0 ]; then
      echo "running yarn build..."
      yarn build
      while [ $? != 0 ]
      do
        echo "failed to build imi-standalone-toolbox-ui website files. trying again..."
        yarn build
      done
      echo "yarn build successful. cleaning www folder and copying dist files to www folder..."
      rm -rf /var/www/toolbox/imi-standalone/*
      cp -rf dist/* /var/www/toolbox/imi-standalone/
      if [ $? -eq 0 ]; then
        echo "successfully installed imi-standalone-toolbox-ui website files"
      else
        echo "failed to install imi-standalone-toolbox-ui website files"
      fi
    else
      echo "yarn failed. help me."
    fi
  else
    echo "failed to pull repo. help me."
  fi
fi
