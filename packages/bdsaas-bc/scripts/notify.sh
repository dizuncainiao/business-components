#!/bin/sh

cd ../publish

PKG=$(<package.json)

VERSION=$(echo "$PKG" | sed -n 's/.*"version": "\([^"]*\)",.*$/\1/p')
NAME=$(echo "$PKG" | sed -n 's/.*"name": "\([^"]*\)",.*$/\1/p')

curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key='$THREE_MICRO_APP \
   -H 'Content-Type: application/json' \
   -d '
   {
       "msgtype": "markdown",
       "markdown": {
           "content": "<font color=\"warning\">前端发版通知</font>
            >项目名称: 业务组件库 '$NAME'
            >最新版本: '$VERSION'
            >更新日志: [点击查看](https://dizuncainiao.github.io/business-components/change-log/)
            >任务已构建完成，请及时更新: <@所有人> 【不回复】",
       },
   }'
