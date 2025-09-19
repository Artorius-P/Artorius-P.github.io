const n=`--- 
title: 爬虫学习笔记
date: 2022-01-12
lang: zh_CN
categories:
 - study
---

# 爬虫学习笔记

## XPath

### XPath路径表达式
| 表达式 | 描述 |
| :----- | :--- |
| nodename | 选取此节点的所有子节点 |
| / | 从根节点选取 |
| // | 从匹配选择的当前节点选择文档中的节点，不考虑它们的位置 |
| . | 选取当前的节点 |
|.. | 选取当前的父节点 |
| @ | 选取属性 |
例如，选出相对路径下所有class1属性的a标签内的文字

\`\`\`
.//a[@class="class1"]/text()
\`\`\`

### “*”通配符
| 表达式 | 描述 |
| :----- | :--- |
| /school/* | 选取school元素的所有子元素 |
| //* | 选取文档中的所有元素 |
| //name[@*] | 选取所有带有属性的元素 |

### “|”运算符

如果匹配多个路径，则可以使用\`|\`运算符。比较简单，不举例了。

### XPath 其他运算符
加减乘，大于小于不等于这些闭着眼睛都能写。几个特例除外
- \`div\` 除法
- \`or\` 或
- \`and\` 与
- \`mod\` 模

## Scrapy的编写流程

首先用scrapy自带的脚本创建project

\`\`\`
scrapy startproject myproject
\`\`\`

接着进入该目录，创建第一个爬虫程序，注意不可以跟项目同名

\`\`\`
scrapy genspider myspider mysite.com
\`\`\`

创建完成之后会有在sipder文件夹里生成一个Spider类，对应网页的spider就可以在这里编写。
另外，在上级文件夹里还有几个文件。

在settings.py里可以设置爬虫的参数，例如headers,user-agent,并发数量，等待时间等等。

在items类里可以定义爬取的item，例子如下：

\`\`\`python
import scrapy

class EthItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    contract = scrapy.Field()
    name = scrapy.Field()
    date = scrapy.Field()
    txs = scrapy.Field()
\`\`\`
在spider类里爬取到的item需要通过yield item的形式传入管道，每个管道对收到的item进行特定的操作并传出，管道执行的优先级可以在settings.py里进行设置。
`;export{n as default};
