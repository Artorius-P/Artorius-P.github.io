import{_ as p,C as e,c as t,o as l,j as a,G as i,ag as o,a as c}from"./chunks/framework.tfLYlFWj.js";const v=JSON.parse('{"title":"给博客加个空调","description":"","frontmatter":{"title":"给博客加个空调","date":"2022-08-05T00:00:00.000Z","lang":"zh_CN","categories":["life"]},"headers":[],"relativePath":"life/2022-08-05-1.md","filePath":"life/2022-08-05-1.md","lastUpdated":1758246806000}'),r={name:"life/2022-08-05-1.md"};function d(g,s,h,m,_,u){const n=e("AirConditioner");return l(),t("div",null,[s[0]||(s[0]=a("h1",{id:"给博客加个空调",tabindex:"-1"},[c("给博客加个空调 "),a("a",{class:"header-anchor",href:"#给博客加个空调","aria-label":'Permalink to "给博客加个空调"'},"​")],-1)),i(n),s[1]||(s[1]=o(`<h2 id="方法" tabindex="-1">方法 <a class="header-anchor" href="#方法" aria-label="Permalink to &quot;方法&quot;">​</a></h2><p>在<code>.vuepress/component</code>里新建一个AirConditioner.vue文件，内容如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;style&gt;</span></span>
<span class="line"><span>    .aspect-ratio {</span></span>
<span class="line"><span>        position: relative;</span></span>
<span class="line"><span>        width: 100%;</span></span>
<span class="line"><span>        height: 100vh;</span></span>
<span class="line"><span>        padding-bottom: 100%;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>          </span></span>
<span class="line"><span>    .aspect-ratio iframe {</span></span>
<span class="line"><span>        position: absolute;</span></span>
<span class="line"><span>        width: 100%;</span></span>
<span class="line"><span>        height: 100vh;</span></span>
<span class="line"><span>        left: 0;</span></span>
<span class="line"><span>        top: 0;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span> &lt;/style&gt;</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>&lt;div align=center class=&quot;aspect-ratio&quot;&gt;</span></span>
<span class="line"><span>    &lt;iframe src=&quot;https://air-conditioner-guole.vercel.app&quot;&gt;&lt;/iframe&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  name: &#39;AirConditioner&#39;,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`然后在想加入空调的文章里加上&lt;AirConditioner /&gt;即可。</span></span></code></pre></div>`,3))])}const C=p(r,[["render",d]]);export{v as __pageData,C as default};
