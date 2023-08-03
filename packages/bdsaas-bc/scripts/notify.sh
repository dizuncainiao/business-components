#!/bin/sh

curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key='$THREE_MICRO_APP \
   -H 'Content-Type: application/json' \
   -d '
   {
        "msgtype": "text",
        "text": {
            "content": "小伙伴们好 [呲牙]。bdsaas-bc 包已经发布成功，可以在 https://www.npmjs.com/package/bdsaas-bc 查看最新版本，请及时更新哦！"
        }
   }'

##!/bin/sh
#MSG="中文字符"
## 进行urlencode编码，然后传输，否则接口收到的中文是乱码
#urlEncodeMsg=`echo -n "$MSG" | xxd -ps | tr -d '\n' | sed -r 's/(..)/%\1/g'`;
## 调用massage校验接口
#RESULT=`curl -H "Content-Type:application/x-www-form-urlencoded" -s -X POST -d "msg=$urlEncodeMsg" "http://localhost:8080/tt/test"`
#echo $RESULT;
