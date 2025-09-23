const n=`--- 
title: Linux下查看硬件温度
date: 2021-01-29
lang: zh_CN
categories:
 - daily
---

# Linux下查看硬件温度
> [来自博客](https://stackoverflow.club/article/command_lint_inspect_temp)

## 安装
主要使用lm-sensors hddtemp 这两个软件
在Ubuntu下
\`\`\`
sudo apt-get install lm-sensors hddtemp
sudo sensors-detect
\`\`\`

## 使用
命令行输入sensors即可使用。
`;export{n as default};
