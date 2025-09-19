const n=`---
title: 配置Rime输入法

date: 2020-12-20
lang: zh_CN
categories:

 - daily

---

# 配置Rime输入法

> 感谢博客
>
> https://sh.alynx.one/posts/My-RIME/

将我的github中\`mytools/rime\`文件夹里的所有东西复制到\`~/.config/ibus/rime\`中，删除\`~/.config/ibus/rime/build\`文件夹。

接着运行\`ibus-daemon -rdx\`

基本就配置完了。现在要做的事就是慢慢养词库了。

为了防止以往，记一下改动的部分

\`ibus_rime.yaml\` 将竖着的显示改为横着的。

\`\`\`yaml
style:
  horizontal: true
\`\`\`

由于我使用小鹤双拼，所以这里使用了基于明月拼音的双拼方案，

即\`double_pinyin_flypy.schema.yaml\`

\`\`\`yaml
switches:
  - name: ascii_mode
    reset: 0
    states: [ 中文, 西文 ]
  - name: full_shape
    states: [ 半角, 全角 ]
  - name: simplification
  # 这里reset设为1，来默认简体
    reset: 1
    states: [ 漢字, 汉字 ]
  - name: ascii_punct
    states: [ 。，, ．， ]

\`\`\`

\`default.yaml\`我在原博基础上做了一些删减，去除了emacs的相关内容（本人从来不用emacs，所以也不会用到它的键位）

因为我习惯用ctrl而不是shift切换中英文，所以这里直接改成了用ctrl，并且一般都是切换直接字母上屏而不是汉字上屏，所以从\`commit_text\`改成了\`commit_code\`

\`\`\`yaml
ascii_composer:
  good_old_caps_lock: true
  switch_key:
    Shift_L: noop
    Shift_R: noop
    Control_L: commit_code
    Control_R: inline_ascii
    Caps_Lock: clear
    Eisu_toggle: clear
\`\`\`

由于我习惯7字候选，所以这一部分也改了一下

\`\`\`yaml
menu:
  page_size: 7
\`\`\`

## 如何同步词库
windows的傻瓜操作，略。
linux下导出词库用\`rime_dict_manager\`
\`\`\`
options:
	-l|--list
	-s|--sync
	-b|--backup dict_name
	-r|--restore xxx.userdb.txt
	-e|--export dict_name export.txt
	-i|--import dict_name import.txt
\`\`\`
由于小鹤双拼也是基于明月拼音的，所以可以这样：
\`\`\`
rime_dict_manager -e luna_pinyin mydb.txt #导出
rime_dict_manager -i luna_pinyin mydb.txt #导入
\`\`\`

其他地方参照原博博主。

至于为什么不用ubuntu自带的拼音，当然是因为用得不爽了。

`;export{n as default};
