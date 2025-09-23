const n=`---
title: Ubuntu 防火墙设置
date: 2020-04-30
lang: zh_CN 
categories: 

- 折腾日常 

---

# Ubuntu 防火墙设置

1. 启用防火墙

\`\`\`
 sudo ufw enable
\`\`\`

​	设置默认deny

\`\`\`
 sudo ufw default deny 
\`\`\`

2. 查看状态

\`\`\`
 sudo ufw status
\`\`\`

3. 开启/禁用端口

\`\`\`
 sudo ufw allow 80 允许外部访问80端口
 sudo ufw delete allow 80 禁止外部访问80 端口
 sudo ufw allow from 192.168.1.1 允许此IP访问所有的本机端口
 sudo ufw deny smtp 禁止外部访问smtp服务
 sudo ufw delete allow smtp 删除上面建立的某条规则
 sudo ufw allow from 192.168.1.0/24
\`\`\`
`;export{n as default};
