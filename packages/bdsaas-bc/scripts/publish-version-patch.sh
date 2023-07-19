#!/bin/sh
cd ../publish

npm version patch

git add .

git commit -m "chore: 🤖 publish/package.json version patch"
