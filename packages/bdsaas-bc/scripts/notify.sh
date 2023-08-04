#!/bin/sh

cd ../publish

if command -v jq >/dev/null 2>&1; then
  echo "jq is installed"

  PKG_NAME=$(jq -r '.name' package.json)
  PKG_VERSION=$(jq -r '.version' package.json)

  echo $PKG_NAME
  echo $PKG_VERSION
else
  echo "jq is uninstalled"

  sudo apt-get update
  sudo apt-get install jq


  PKG_NAME=$(jq -r '.name' package.json)
  PKG_VERSION=$(jq -r '.version' package.json)

  echo $PKG_NAME
  echo $PKG_VERSION
fi

#echo "按任意键继续"
#read -n 1
