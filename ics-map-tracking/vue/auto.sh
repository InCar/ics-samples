#!/bin/bash
# 自动部署及发布

# V=$1
ip=212.129.144.117
# 开发地址
server_file_dev=/home/incar/web/cctmp-web/dist/

# while [[!V]]
# do
# done

echo '开始编译'
npm run build
echo '清理远程文件'
ssh root@$ip "rm -rf ${server_file_dev}"
echo 'copy 本地文件夹到服务器'
scp -r dist/ root@${ip}:${server_file_dev}
exit 0;
