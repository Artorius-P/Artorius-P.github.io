const n=`---
title: SQLite问题汇总
date: 2020-02-20
categories:
 - 折腾日常
---


# SQLite 问题汇总
最近在写一个小玩具，有一些SQLite问题，汇总一下。

## 1. 主键可以为NULL

2020-02-20
今天在写what to eat 程序的时候一个单元测试没有通过，结果发现是SQLite中，主键可以为NULL。
> 由于"长期存在编码监督"，在 SQLite 中，主键可以是 NULL，这是与其他数据库不同的地方。
特此记录。

## 外键默认不开启
为了与先前版本保持兼容，sqlite的外键在每次连接时都默认不开启。如需开启外键，需在每次连接时执行以下命令：
\`\`\`
PRAGMA foreign_keys=ON;
\`\`\`

## 获取最新自增主键的行
执行如下语句即可
\`\`\`
select last_insert_rowid() from tablename
\`\`\`
`;export{n as default};
