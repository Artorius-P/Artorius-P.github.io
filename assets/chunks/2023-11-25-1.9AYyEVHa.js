const n=`--- 
title: 在Mac上干掉EasyConnect的流氓行为
date: 2023-11-25
lang: zh_CN
categories:
 - daily
---
# 在Mac上干掉EasyConnect的流氓行为

感谢博客
> https://blog.isteed.cc/post/fuck-easyconnect-on-macos/

现在似乎各个学校的VPN都是EasyConnect，由于深信服一直臭名远扬，一直没有安装。今天迫不得已用了学校的VPN，Mac 上安装时居然提示在安装根证书。我的妈，作为一个网安人，这种行为无疑是在我头上拉屎。赶紧搜了博客，解决一下这个流氓。

## 删除开机启动项

作为一个VPN客户端，实在不理解你开机常驻的意义，删了。

\`\`\`
sudo rm /Library/LaunchDaemons/com.sangfor.EasyMonitor.plist && sudo rm /Library/LaunchAgents/com.sangfor.ECAgentProxy.plist
\`\`\`

## 删除根证书

重启电脑，打开 钥匙串访问，系统 - 证书，右键 Sangfor Technologies Inc.，删除证书即可

若证书删除后不久又自动添加回来，检查是否删除开机启动项并重启

## 添加shell脚本来启动

\`\`\`
startEC() {
    /Applications/EasyConnect.app/Contents/Resources/bin/EasyMonitor > /dev/null 2>&1 &
    /Applications/EasyConnect.app/Contents/MacOS/EasyConnect > /dev/null 2>&1 &
}

fuckEC() {
    function killprocess()
    {
        processname=$1
        killall $processname >/dev/null 2>&1
        proxypids=$(ps aux | grep -v grep | grep $processname | awk '{print $2}')
        for proxypid in $proxypids
        do
            kill -9 $proxypid
        done
    }

    killprocess svpnservice
    killprocess CSClient
    killprocess ECAgentProxy
    killprocess /Applications/EasyConnect.app/Contents/MacOS/EasyConnect

    pkill ECAgent
    pkill EasyMonitor
}
\`\`\`
最后祝所有流氓公司恶有恶报。
`;export{n as default};
