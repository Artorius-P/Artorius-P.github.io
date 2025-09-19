const n=`--- 
title: Windows Server激活方法
date: 2023-05-12
lang: zh_CN
categories:
 - daily
---

# Windows Server激活方法
从微软的[Evaluation Center](https://info.microsoft.com/ww-landing-windows-server-2022.html)可以下载到用于评估的Windows Server的镜像文件，首次下载可能需要填写公司名称等，随便填一个即可。然而只有180天的激活时间，因此需要修改版本并使用KMS激活。

首先查看当前的版本
\`\`\`
DISM /online /Get-CurrentEdition
\`\`\`
例如，标准版的评估版显示ServerStandardEval。接着需要将版本修改成标准版，可用以下命令查看可升级的版本。
\`\`\`
DISM /online /Get-TargetEditions
\`\`\`
以下命令为升级2022的实例，需要根据产品更换不同的密钥。可在微软官方[网站](https://learn.microsoft.com/en-us/windows-server/get-started/kms-client-activation-keys)找到。

\`\`\`
dism /online /set-edition:ServerStandard /productkey:VDYBN-27WPP-V4HQT-9VMD4-VMK7H /accepteula
\`\`\`
升级完成后重启即可。
`;export{n as default};
