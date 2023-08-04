#!/bin/sh

cd ../publish

if command -v jq >/dev/null 2>&1; then
  echo "jq is installed"

  PKG_NAME=$(jq -r '.name' package.json)
  PKG_VERSION=$(jq -r '.version' package.json)

  echo $PKG_NAME
  echo $PKG_VERSION

  curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key='$FRONT_END_MICRO_SERVICES_GROUP \
       -H 'Content-Type: application/json' \
       -d '
       {
           "msgtype": "markdown",
           "markdown": {
               "content": "<font color=\"warning\">前端发版通知</font>
                >项目名称: 业务组件库 '$PKG_NAME'
                >最新版本: <font color=\"info\">'$PKG_VERSION'</font>
                >更新日志: [点击查看](https://dizuncainiao.github.io/business-components/change-log/)
                >任务已构建完成，请及时更新: <@所有人>【不回复】",
           },
       }'
else
  echo "jq is uninstalled"

  sudo apt-get update
  sudo apt-get install jq


  PKG_NAME=$(jq -r '.name' package.json)
  PKG_VERSION=$(jq -r '.version' package.json)

  echo $PKG_NAME
  echo $PKG_VERSION

  curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key='$FRONT_END_MICRO_SERVICES_GROUP \
       -H 'Content-Type: application/json' \
       -d '
       {
           "msgtype": "markdown",
           "markdown": {
               "content": "<font color=\"warning\">前端发版通知</font>
                >项目名称: 业务组件库 '$PKG_NAME'
                >最新版本: '$PKG_VERSION'
                >更新日志: [点击查看](https://dizuncainiao.github.io/business-components/change-log/)
                >任务已构建完成，请及时更新: <@所有人>【不回复】",
           },
       }'
fi
