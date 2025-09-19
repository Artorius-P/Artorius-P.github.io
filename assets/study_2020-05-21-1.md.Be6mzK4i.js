import{_ as a,c as n,o as p,ag as i}from"./chunks/framework.tfLYlFWj.js";const o=JSON.parse('{"title":"ICS学习笔记","description":"","frontmatter":{"title":"ICS学习笔记","date":"2020-05-21T00:00:00.000Z","lang":"zh_CN","categories":["study"]},"headers":[],"relativePath":"study/2020-05-21-1.md","filePath":"study/2020-05-21-1.md","lastUpdated":1758246806000}'),l={name:"study/2020-05-21-1.md"};function e(t,s,h,d,r,c){return p(),n("div",null,[...s[0]||(s[0]=[i(`<h1 id="ics学习笔记" tabindex="-1">ICS学习笔记 <a class="header-anchor" href="#ics学习笔记" aria-label="Permalink to &quot;ICS学习笔记&quot;">​</a></h1><h2 id="一个简单递归函数的分析" tabindex="-1">一个简单递归函数的分析 <a class="header-anchor" href="#一个简单递归函数的分析" aria-label="Permalink to &quot;一个简单递归函数的分析&quot;">​</a></h2><p>为了研究栈空间是如何分配的，我先是写了这样一个小递归</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (n </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> n </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(n </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>使用<code>objdump -d a.out</code>整理后的结果如下</p><div class="language-nasm vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nasm</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>_main:</span></span>
<span class="line"><span>pushq	%rbp</span></span>
<span class="line"><span>movq	%rsp, %rbp</span></span>
<span class="line"><span>subq	$16, %rsp</span></span>
<span class="line"><span>movl	$0, -4(%rbp)</span></span>
<span class="line"><span>movl	$3, %edi</span></span>
<span class="line"><span>callq	23 &lt;__Z3addi&gt;</span></span>
<span class="line"><span>xorl	%edi, %edi</span></span>
<span class="line"><span>movl	%eax, -8(%rbp)</span></span>
<span class="line"><span>movl	%edi, %eax</span></span>
<span class="line"><span>addq	$16, %rsp</span></span>
<span class="line"><span>popq	%rbp</span></span>
<span class="line"><span>retq</span></span>
<span class="line"><span>nopw	%cs:(%rax,%rax)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>__Z3addi:</span></span>
<span class="line"><span>pushq	%rbp</span></span>
<span class="line"><span>movq	%rsp, %rbp</span></span>
<span class="line"><span>subq	$16, %rsp</span></span>
<span class="line"><span>movl	%edi, -8(%rbp)</span></span>
<span class="line"><span>cmpl	$0, -8(%rbp)</span></span>
<span class="line"><span>jg	12 &lt;__Z3addi+0x21&gt;</span></span>
<span class="line"><span>movl	$0, -4(%rbp)</span></span>
<span class="line"><span>jmp	27 &lt;__Z3addi+0x3c&gt;</span></span>
<span class="line"><span>movl	-8(%rbp), %eax</span></span>
<span class="line"><span>movl	-8(%rbp), %ecx</span></span>
<span class="line"><span>subl	$1, %ecx</span></span>
<span class="line"><span>movl	%ecx, %edi</span></span>
<span class="line"><span>movl	%eax, -12(%rbp)</span></span>
<span class="line"><span>callq	-52 &lt;__Z3addi&gt;</span></span>
<span class="line"><span>movl	-12(%rbp), %ecx</span></span>
<span class="line"><span>addl	%eax, %ecx</span></span>
<span class="line"><span>movl	%ecx, -4(%rbp)</span></span>
<span class="line"><span>movl	-4(%rbp), %eax</span></span>
<span class="line"><span>addq	$16, %rsp</span></span>
<span class="line"><span>popq	%rbp</span></span>
<span class="line"><span>retq</span></span></code></pre></div><h3 id="开辟栈帧-stack-frame" tabindex="-1">开辟栈帧（Stack Frame） <a class="header-anchor" href="#开辟栈帧-stack-frame" aria-label="Permalink to &quot;开辟栈帧（Stack Frame）&quot;">​</a></h3><p>每个函数的开头都有一段这样的代码</p><div class="language-nasm vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nasm</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pushq	%rbp</span></span>
<span class="line"><span>movq	%rsp, %rbp</span></span>
<span class="line"><span>subq	$16, %rsp</span></span></code></pre></div><p>其中：</p><ul><li><code>rbp</code>是64位的基址指针寄存器（base pointer），指向当前栈的基址。</li><li><code>rsp</code>是64位的栈指针寄存器（stack pointer），指向当前栈的栈顶。</li></ul><h4 id="执行过程" tabindex="-1">执行过程 <a class="header-anchor" href="#执行过程" aria-label="Permalink to &quot;执行过程&quot;">​</a></h4><ul><li><code>push %rbp</code> 将当前的基址压入栈顶，在完成这一动作后，<code>rsp</code>中的值将变为新的栈顶地址。</li><li><code>mov %rsp, %rbp</code>将<code>rsp</code>中栈指针的值移动到基址指针寄存器<code>rbp</code>中。现在，<code>rsp</code>和<code>rbp</code>都指向栈顶</li><li><code>subq $16, %rsp</code>这一命令创建了一个空间来储存局部变量。这个空间足够用来储存<code>integer</code>。</li><li>通过上面三个操作，计算机就完成了在内存中创建一个储存局部变量的空间，这一空间被称为栈帧（stack frame）一般来说，在内存中栈是从高地址向低地址延伸的。</li></ul><h3 id="递归过程分析" tabindex="-1">递归过程分析 <a class="header-anchor" href="#递归过程分析" aria-label="Permalink to &quot;递归过程分析&quot;">​</a></h3><ul><li><p><code>cmpl</code>指令很容易看出是比较指令，它影响<code>OF,ZF,SF,CF</code>四个常用标志</p><blockquote><p>Overflow Flag: OF=1溢出</p><p>Zero Flag：ZF=1运算结果为0</p><p>Sign Flag：SF=1运算结果为负数</p><p>Carry Flag：CF=1运算后有借位</p></blockquote></li><li><p><code>jg</code>命令是一个条件转移指令，</p></li></ul>`,15)])])}const g=a(l,[["render",e]]);export{o as __pageData,g as default};
