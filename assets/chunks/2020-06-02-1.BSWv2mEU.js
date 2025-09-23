const n=`---
title: 计算机网络复习笔记
date: 2020-06-02
lang: zh_CN
categories:

 - study

---

# 计算机网络复习笔记

## 0. 概述

### 基本常识

#### 网络分类

1. Personal Area Network (PAN)
2. Local Area Network (LAN)
3. Metropolitan Area Network (MAN)
4. Wide Area Network (WAN)
5. Internet

#### 名词解释

- RFC: 请求意见稿（英语：Request for Comments，缩写：RFC），又翻译作意见征求，意见请求，请求评论是由互联网工程任务组（IETF）发布的一系列备忘录。文件收集了有关互联网相关信息，以及UNIX和互联网社群的软件文件，以编号排定。目前RFC文件是由互联网协会（ISOC）赞助发行。

- IETF: 互联网工程任务组（英语：Internet Engineering Task Force，缩写：IETF）是一个开放的标准组织，负责开发和推广自愿互联网标准（Internet Standard，英文缩写为STD），特别是构成TCP/IP协议族（TCP/IP）的标准。 它没有正式的会员资格或会员资格要求。

- access networks: 接入网络，如DSL(digital subscriber line)；电缆(cable-based access)，使用FDM(频分复用)；光纤入户，FTTH(fibre to the home) Internet access；卫星；家庭网络；无线接入网络；enterprise networks；**data center networks**。

- NAT: 网络地址转换（英语：Network Address Translation，缩写：NAT；又称网络掩蔽、IP掩蔽）在计算机网络中是一种在IP数据包通过路由器或防火墙时重写来源IP地址或目的IP地址的技术。这种技术被普遍使用在有多台主机但只通过一个公有IP地址访问互联网的私有网络中。它是一个方便且得到了广泛应用的技术。当然，NAT也让主机之间的通信变得复杂，导致了通信效率的降低。 

- host(终端)

- circuit switching: 每个人固定带宽, packet switching: 所有人共用带宽

- ISP(s): Internet Service Provider(s)

- IXP: 互联网交换中心（英语：internet exchange point，缩成IX或IXP ）是物理基础结构， 互联网服务供应商 （ISP）和内容传递网络 （CDN）通过它们在它们的网络（ 自治系统 ）之间交换互联网流量。

- peering link: 在计算机网络中，对等连接是行政上分开的Internet网络的自愿互连，目的是在每个网络的“下游”用户之间交换流量。对等连接是免结算的，也称为“帐单和保留(bill-and-keep)”或“发送方保留所有内容(sender keeps all)”，这意味着任何一方都不会因流量交换而向对方付款；相反，每个公司都从自己的客户那里获得并保留收入。

- PoPs(Points of Presence): A PoP is simply a group of one or more routers (at the same location) in the provider's network where customer ISPs can connect into the provider ISP. PoPs exist in all levels of the hierarchy, except for the bottom (access ISP) level.

- multi-homing: to connect to two or more provider ISPs

- Peering: To reduce these costs, a pair of nearby ISPs at the same level of the hierarchy can peer

- 交换

  **电路交换**：整个报文的比特流连续地从源点直达到终点。适合连续传输大量数据，且传送时间远大于连接建立的时间。
  
  **报文交换**：整个报文先传送到相邻节点，全部储存下来后查找转发表，转发到下一个节点。
  
  **分组交换**：单个分组传送到相邻节点，储存转发到下一个节点。比报文交换时延小，灵活性好。

- 往返时间RTT

  有效数据=数据长度/(发送时间+RTT)

- 五层协议

  > 5 应用层
  >
  > 4 运输层
  >
  > 3 网络层
  >
  > 2 数据链路层
  >
  > 1 物理层

  

## 1. 物理层

物理层的主要任务描述为确定与传输媒体的接口的一些特性，即： 

- 机械特性：指明接口所用接线器的形状和尺寸、引线数目和排列、固定和锁定装置等等。
- 电气特性：指明在接口电缆的各条线上出现的电压的范围。
- 功能特性：指明某条线上出现的某一电平的电压表示何种意义。
- 过程特性：指明对于不同功能的各种可能事件的出现顺序。 

### 常用计算公式

信噪比(dB) = $10\\log_{10}(S/N)$

如：S/N=1000时，信噪比为30dB

香农公式 $C=W\\log_2(1+S/N)$



## 2. 数据链路层

## 3. 网络层

## 4. 运输层

## 5. 应用层

`;export{n as default};
