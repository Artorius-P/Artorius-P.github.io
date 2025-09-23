import{_ as s,c as n,o as p,ag as e}from"./chunks/framework.tfLYlFWj.js";const u=JSON.parse('{"title":"在Mac上干掉EasyConnect的流氓行为","description":"","frontmatter":{"title":"在Mac上干掉EasyConnect的流氓行为","date":"2023-11-25T00:00:00.000Z","lang":"zh_CN","categories":["daily"]},"headers":[],"relativePath":"daily/2023-11-25-1.md","filePath":"daily/2023-11-25-1.md","lastUpdated":1758246806000}'),l={name:"daily/2023-11-25-1.md"};function t(c,a,o,i,r,d){return p(),n("div",null,[...a[0]||(a[0]=[e(`<h1 id="在mac上干掉easyconnect的流氓行为" tabindex="-1">在Mac上干掉EasyConnect的流氓行为 <a class="header-anchor" href="#在mac上干掉easyconnect的流氓行为" aria-label="Permalink to &quot;在Mac上干掉EasyConnect的流氓行为&quot;">​</a></h1><p>感谢博客</p><blockquote><p><a href="https://blog.isteed.cc/post/fuck-easyconnect-on-macos/" target="_blank" rel="noreferrer">https://blog.isteed.cc/post/fuck-easyconnect-on-macos/</a></p></blockquote><p>现在似乎各个学校的VPN都是EasyConnect，由于深信服一直臭名远扬，一直没有安装。今天迫不得已用了学校的VPN，Mac 上安装时居然提示在安装根证书。我的妈，作为一个网安人，这种行为无疑是在我头上拉屎。赶紧搜了博客，解决一下这个流氓。</p><h2 id="删除开机启动项" tabindex="-1">删除开机启动项 <a class="header-anchor" href="#删除开机启动项" aria-label="Permalink to &quot;删除开机启动项&quot;">​</a></h2><p>作为一个VPN客户端，实在不理解你开机常驻的意义，删了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sudo rm /Library/LaunchDaemons/com.sangfor.EasyMonitor.plist &amp;&amp; sudo rm /Library/LaunchAgents/com.sangfor.ECAgentProxy.plist</span></span></code></pre></div><h2 id="删除根证书" tabindex="-1">删除根证书 <a class="header-anchor" href="#删除根证书" aria-label="Permalink to &quot;删除根证书&quot;">​</a></h2><p>重启电脑，打开 钥匙串访问，系统 - 证书，右键 Sangfor Technologies Inc.，删除证书即可</p><p>若证书删除后不久又自动添加回来，检查是否删除开机启动项并重启</p><h2 id="添加shell脚本来启动" tabindex="-1">添加shell脚本来启动 <a class="header-anchor" href="#添加shell脚本来启动" aria-label="Permalink to &quot;添加shell脚本来启动&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>startEC() {</span></span>
<span class="line"><span>    /Applications/EasyConnect.app/Contents/Resources/bin/EasyMonitor &gt; /dev/null 2&gt;&amp;1 &amp;</span></span>
<span class="line"><span>    /Applications/EasyConnect.app/Contents/MacOS/EasyConnect &gt; /dev/null 2&gt;&amp;1 &amp;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fuckEC() {</span></span>
<span class="line"><span>    function killprocess()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        processname=$1</span></span>
<span class="line"><span>        killall $processname &gt;/dev/null 2&gt;&amp;1</span></span>
<span class="line"><span>        proxypids=$(ps aux | grep -v grep | grep $processname | awk &#39;{print $2}&#39;)</span></span>
<span class="line"><span>        for proxypid in $proxypids</span></span>
<span class="line"><span>        do</span></span>
<span class="line"><span>            kill -9 $proxypid</span></span>
<span class="line"><span>        done</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    killprocess svpnservice</span></span>
<span class="line"><span>    killprocess CSClient</span></span>
<span class="line"><span>    killprocess ECAgentProxy</span></span>
<span class="line"><span>    killprocess /Applications/EasyConnect.app/Contents/MacOS/EasyConnect</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    pkill ECAgent</span></span>
<span class="line"><span>    pkill EasyMonitor</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>最后祝所有流氓公司恶有恶报。</p>`,13)])])}const g=s(l,[["render",t]]);export{u as __pageData,g as default};
