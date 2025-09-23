const n=`---
title: ICS学习笔记
date: 2020-05-21
lang: zh_CN
categories:

 - study

---

# ICS学习笔记

## 一个简单递归函数的分析

为了研究栈空间是如何分配的，我先是写了这样一个小递归

\`\`\`cpp
int add(int n);

int main() {
    add(3);
    return 0;
}

int add(int n) {
    if (n <= 0) return 0;
    return n + add(n - 1);
}
\`\`\`

使用\`objdump -d a.out\`整理后的结果如下

\`\`\`nasm
_main:
pushq	%rbp
movq	%rsp, %rbp
subq	$16, %rsp
movl	$0, -4(%rbp)
movl	$3, %edi
callq	23 <__Z3addi>
xorl	%edi, %edi
movl	%eax, -8(%rbp)
movl	%edi, %eax
addq	$16, %rsp
popq	%rbp
retq
nopw	%cs:(%rax,%rax)

__Z3addi:
pushq	%rbp
movq	%rsp, %rbp
subq	$16, %rsp
movl	%edi, -8(%rbp)
cmpl	$0, -8(%rbp)
jg	12 <__Z3addi+0x21>
movl	$0, -4(%rbp)
jmp	27 <__Z3addi+0x3c>
movl	-8(%rbp), %eax
movl	-8(%rbp), %ecx
subl	$1, %ecx
movl	%ecx, %edi
movl	%eax, -12(%rbp)
callq	-52 <__Z3addi>
movl	-12(%rbp), %ecx
addl	%eax, %ecx
movl	%ecx, -4(%rbp)
movl	-4(%rbp), %eax
addq	$16, %rsp
popq	%rbp
retq
\`\`\`

### 开辟栈帧（Stack Frame）

每个函数的开头都有一段这样的代码

\`\`\`nasm
pushq	%rbp
movq	%rsp, %rbp
subq	$16, %rsp
\`\`\`

其中：

- \`rbp\`是64位的基址指针寄存器（base pointer），指向当前栈的基址。
- \`rsp\`是64位的栈指针寄存器（stack pointer），指向当前栈的栈顶。

#### 执行过程

- \`push %rbp\` 将当前的基址压入栈顶，在完成这一动作后，\`rsp\`中的值将变为新的栈顶地址。
- \`mov %rsp, %rbp\`将\`rsp\`中栈指针的值移动到基址指针寄存器\`rbp\`中。现在，\`rsp\`和\`rbp\`都指向栈顶
- \`subq $16, %rsp\`这一命令创建了一个空间来储存局部变量。这个空间足够用来储存\`integer\`。
- 通过上面三个操作，计算机就完成了在内存中创建一个储存局部变量的空间，这一空间被称为栈帧（stack frame）一般来说，在内存中栈是从高地址向低地址延伸的。

### 递归过程分析

- \`cmpl\`指令很容易看出是比较指令，它影响\`OF,ZF,SF,CF\`四个常用标志

  > Overflow Flag: OF=1溢出
  >
  > Zero Flag：ZF=1运算结果为0
  >
  > Sign Flag：SF=1运算结果为负数
  >
  > Carry Flag：CF=1运算后有借位

  

- \`jg\`命令是一个条件转移指令，

`;export{n as default};
