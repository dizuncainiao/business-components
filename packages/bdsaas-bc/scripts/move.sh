#!/bin/sh

# 删除当前目录 dist
rm -rf "../publish/dist"

# 将 dist 移动当前目录
mv "../dist" "../publish"
