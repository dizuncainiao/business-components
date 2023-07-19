#!/bin/sh
. publish-version-patch.sh

cd -

. root-version-patch.sh

cd -

. build-changelog.sh

########################调试########################
#echo "按任意键继续"
#read -n 1
########################调试########################
