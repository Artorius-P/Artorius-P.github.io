const n=`---
title: NGINX Docker 的使用
date: 2020-05-01
lang: zh_CN 
categories: 

- 折腾日常 

---

# NGINX Docker 的使用

## 安装

1. 首先拉取镜像

   \`\`\`
   $ docker pull nginx
   \`\`\`

2. 接着将必要的配置文件拷贝出来

   \`\`\`
   $ docker container run \\
   		--rm \\ 
   		-d \\
   		--name tmp-nginx \\
   		nginx
   \`\`\`

   各参数的含义：

   \`\`\`
   --rm 在容器运行结束时删除容器
   -d 后台运行容器
   --name 自定义容器名
   \`\`\`

   然后新建目录

   \`\`\`
   $ mkdir nginx
   $ cd nginx
   \`\`\`

   拷贝配置文件

   \`\`\`
   $ docker container cp tmp-nginx:/etc/nginx .
   $ mv nginx conf
   $ docker container cp tmp-nginx:/usr/share/nginx .
   $ mv nginx www
   \`\`\`

   现在可以删除刚刚的容器了

   \`\`\`
   $ docker container stop tmp-nginx
   \`\`\`

## 配置

1. 配置ssl证书

   \`\`\`
   $ cd conf
   $ mkdir certs
   \`\`\`

   将证书拷贝进certs文件夹

   \`\`\`
   $ cd ../conf.d
   $ cp default.conf yoursite.conf
   \`\`\`

   修改\`\`\`yoursite.conf\`\`\`

   \`\`\`
   加一个这个来强制https
   ###########################
   server {
       listen 80;
       server_name www.yoursite.com;
       rewrite ^(.*)$ https://\${server_name}$1 permanent; 
   }
   ###########################
   然后下面的证书配置一下
   server {
       listen       443 ssl http2;
       server_name  www.yoursite.com;
       ssl_certificate    /etc/nginx/certs/yourcert;
       ssl_certificate_key      /etc/nginx/certs/yourkey;
       ssl_session_timeout  5m;
   }
   \`\`\`

   然后就可以启动nginx的容器了

   最好写成bash脚本方便启动

   \`\`\`bash
   #! /bin/bash
   
   cd yourconfpath/nginx
   docker run -d \\
           --name nginx \\
           --rm \\
           -v $(pwd)/conf:/etc/nginx \\
           -v $(pwd)/www:/usr/share/nginx/ \\
           -p 80:80 -p 443:443 \\
           nginx
   \`\`\`

   参数含义:

   \`\`\`
   -v 将本地文件映射到docker容器
   -p 将本地端口映射到docker容器
   \`\`\`

   然后么，基本就完事了

   \`\`\`
   $ docker ps -a
   \`\`\`

   看一看有没有在运行

   打开网页看一看有没有显示，就OK 了。其他包括apache啊，caddy啊，wordpress之类的镜像大同小异。

   写个博客记录一下，怕自己把命令给忘了。

`;export{n as default};
