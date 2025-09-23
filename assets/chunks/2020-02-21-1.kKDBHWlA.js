const n=`# 让终端走代理的方法

## 1. 使用环境变量

一般来说，我会直接这么写一个别名。

\`\`\`bash
  1 alias proxyon="export ALL_PROXY=socks5://127.0.0.1:1080 && export http_proxy=socks5://127.0.0.1:1080 && export https_proxy=socks5://127.0.0    .1:1080"
  2 alias proxyoff="unset ALL_PROXY && unset https_proxy && unset http_proxy"
\`\`\`

但是这么做\`wget\`会报错,于是我又找到第二种方法。

## 2. 使用\`proxychains\`

直接

\`\`\`bash
sudo pacman -S proxychains
\`\`\`

然后再

\`\`\`bash
sudo vim /etc/proxychains.conf
\`\`\`

在文件最下面添加\`socks5 127.0.0.1 1080\`

以后再需要用代理的时候就直接这样

\`\`\`bash
proxychains yourapp
\`\`\`

就可以强制该软件使用代理了。

注意事项:

1. 要选 \`dynamic_chain\` 而不是 \`random_chain\`
2. 可以列举几个代理服务器，\`proxychains\` 会按顺序用，代理无法访问即自动选用下一个
3. 代理服务器要根据自己电脑的情况自行调整

`;export{n as default};
