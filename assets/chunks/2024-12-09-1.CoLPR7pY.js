const e=`--- 
title: openEuler卡死在EFI stub Exiting boot services
date: 2024-12-09
lang: zh_CN
categories:
 - daily
---
# openEuler卡死在EFI stub Exiting boot services

> 来源: [openeuler论坛](https://forum.openeuler.org/t/topic/6325)

最新的24.03LTS依旧没解决。
解决方法：删除grub中的\`video=efifb:off\`参数

原因:EFI Framebuffer (efifb) 是 Linux 内核在 UEFI 启动模式下的基础图形驱动，用于提供图形输出的最低支持。
在没有加载特定显卡驱动时，efifb 提供初始的显示功能（如引导界面、基本终端）。
用 efifb：通过 video=efifb:off，内核不会加载 efifb 图形驱动。
释放显存控制权：禁用 efifb 后，专门的显卡驱动（如 NVIDIA、AMD、Intel 驱动）可以完全接管图形设备的控制权。
解决冲突：避免 efifb 与其他显卡驱动（如 NVIDIA DRM 模块）发生资源争夺

openEuler进行这个默认配置应该是希望遇到以上显卡时避免冲突，让系统安装更顺畅。
但实际上，需要确保显卡驱动正确加载，否则可能导致显示异常（VMWare和VirtualBox就都出遇上这个问题了）。
`;export{e as default};
