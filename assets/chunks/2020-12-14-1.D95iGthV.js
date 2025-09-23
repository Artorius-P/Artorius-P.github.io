const n=`---
title: Mac 读取NTFS分区
date: 2020-12-14
lang: zh_CN
categories:

 - daily

---

# Mac 读取NTFS分区

编辑\`/etc/fstab\`，没有就新建一个

加一行

LABEL=**NAME** none ntfs rw,auto,nobrowse

其中name是要读取的卷的名字

然后退出卷再插一次。

`;export{n as default};
