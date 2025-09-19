const n=`--- 
title: 给博客加个空调 
date: 2022-08-05
lang: zh_CN
categories:
 - life
---
# 给博客加个空调
<AirConditioner />

## 方法
在\`.vuepress/component\`里新建一个AirConditioner.vue文件，内容如下：
\`\`\`
<style>
    .aspect-ratio {
        position: relative;
        width: 100%;
        height: 100vh;
        padding-bottom: 100%;
        }
          
    .aspect-ratio iframe {
        position: absolute;
        width: 100%;
        height: 100vh;
        left: 0;
        top: 0;
        }
 </style>
<template>
<div align=center class="aspect-ratio">
    <iframe src="https://air-conditioner-guole.vercel.app"></iframe>
</div>
</template>

<script>
export default {
  name: 'AirConditioner',
}

<\/script>

\`\`\`然后在想加入空调的文章里加上<AirConditioner />即可。
`;export{n as default};
