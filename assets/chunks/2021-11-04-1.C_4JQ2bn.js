const n=`---
title: 解决Mac Thunderbolt只有30Hz
date: 2021-11-04
lang: zh_CN
categories:

 - daily

---

# 解决Mac Thunderbolt只有30Hz

显示器的dock连接一个thunderbolt的带宽为40Gb/s，而如果显示器的拓展坞开启了USB3.2的话，将占用20Gb/s的带宽。4K 60Hz的带宽为11.4Gb/s，此时mac会限制连接的速率，将画面降为4K30Hz。因此只要将显示器的USB模式改为2.0即可开启4K60Hz。`;export{n as default};
