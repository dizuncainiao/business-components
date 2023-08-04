#!/bin/sh

cd ../publish

if command -v jq >/dev/null 2>&1; then
  echo "jq is installed"

  PKG=$(cat package.json)
  echo $PKG

  VERSION=$(echo "$PKG" | sed -n 's/.*"version": "\([^"]*\)",.*$/\1/p')
  NAME=$(echo "$PKG" | sed -n 's/.*"name": "\([^"]*\)",.*$/\1/p')
  JQ_GET_NAME=$(echo "$PKG" | jq '.name')
  JQ_GET_NAME2=$(jq -r '.name' package.json)

  echo $VERSION
  echo $NAME
  echo $JQ_GET_NAME
  echo $JQ_GET_NAME2
else
  echo "jq is uninstalled"
  echo "Now installing jq"
  sudo apt-get update
  sudo apt-get install jq
  echo "Jq installation completed"

  PKG=$(cat package.json)
  echo $PKG

  VERSION=$(echo "$PKG" | sed -n 's/.*"version": "\([^"]*\)",.*$/\1/p')
  NAME=$(echo "$PKG" | sed -n 's/.*"name": "\([^"]*\)",.*$/\1/p')
  JQ_GET_NAME=$(echo "$PKG" | jq '.name')
  JQ_GET_NAME2=$(jq -r '.name' package.json)

  echo $VERSION
  echo $NAME
  echo $JQ_GET_NAME
  echo $JQ_GET_NAME2
fi

#echo "按任意键继续"
#read -n 1
