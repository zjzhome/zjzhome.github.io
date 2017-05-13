---
layout: post
title: Bash 操作指南
banner: sort.jpg
tags: bash
---

换了 Mac，装了 iTerm 2，开始慢慢习惯在命令行下敲敲打打，借此学习下 bash 相关的基本操作。本文翻译自 [https://github.com/Idnan/bash-guide](https://github.com/Idnan/bash-guide)。


# 基本操作

### a. export

罗列所有的环境变量。使用 `echo $VARIABLE_NAME` 获取特定变量的详细内容。

示例：

```bash
$ export
AWS_HOME=/Users/adnanadnan/.aws
LANG=en_US.UTF-8
LC_CTYPE=en_US.UTF-8
LESS=-R

$ echo $AWS_HOME
/Users/adnanadnan/.aws
```

### b. whatis

whatis 是对用户命令、系统调用、库方法以及用户手册的描述。

```bash
$ whatis bash
bash (1)             - GNU Bourne-Again SHell
```

### c. whereis

whereis 利用系统数据库来搜索可执行文件、源文件和用户手册。

```bash
$ whereis php
/usr/bin/php
```

### d. which

which 会搜索由环境变量 Path 指定的可执行文件，并打印出该可执行文件的完整命令。

示例：

```bash
$ which php
/c/xampp/php/php
```

### e. clear

清空窗口内容

## 1.1 文件操作

### a. cat

在 Unix\Linux 环境下，可以实现以下功能：

* 在屏幕上展示文本文件
* 复制文本文件
* 合并文本文件
* 创建新的文本文件

```bash
cat filename
cat file1 file2 
cat file1 file2 > newcombinedfile
cat < file1 > file2 #copy file1 to file2
```

### b. chmod

chmod 即 “change mode”，可以用来改变文件或者目录的读、写和可执行权限。更多信息参考[这个链接](https://ss64.com/bash/chmod.html)

### c. chown

chown 即 “change owner”，可以用来改变文件或者目录的拥有者，拥有者可以是用户或者用户组。基础的用户是用户（拥有者）在前，用户组在后，以冒号分割。

```bash
chown -options user:group filename
```

### d. cp

复制文件

```bash
cp filename1 filename2
```

`filename1` 是源文件，`filename2` 是要复制到的路径。

### e. diff

比较文件，并列举不同

```bash
diff filename1 filename2
```

### f. file

确定文件类型

```bash
$ file index.html
 index.html: HTML document, ASCII text
```

### g. find

在目录中查找文件

```bash
find directory options pattern
```

示例：

```bash
$ find . -name README.md
$ find /home/user1 -name '*.png'
```

### h. gunzip

解压缩使用 gzip 压缩的文件

```bash
gunzip filename
```

### i. gzcat 

无需解压 gzip 压缩过的文件，查看其中的内容

### j. gzip

压缩文件

### k. head 

输出文件的前10行

### l. lpq

输出打印队列

```
$ lpq
Rank    Owner   Job     File(s)                         Total Size
active  adnanad 59      demo                            399360 bytes
1st     adnanad 60      (stdin)                         0 bytes
```

### m. lpr

打印文件

### n. lprm

从打印机队列中移除某个任务

```bash
lprm jobnumber
```

### o. ls

列举当前目录下的文件。`ls` 有许多选项：`-l` 以“长格式”列举文件，包括文件的准确大小、拥有者、查看权限以及上次修改时间。`-a`罗列包括隐藏文件在内的所有文件。更多关于这个命令的信息查看[这个链接](https://ss64.com/bash/ls.html)

```bash
$ ls -la
rwxr-xr-x   33 adnan  staff    1122 Mar 27 18:44 .
drwxrwxrwx  60 adnan  staff    2040 Mar 21 15:06 ..
-rw-r--r--@  1 adnan  staff   14340 Mar 23 15:05 .DS_Store
-rw-r--r--   1 adnan  staff     157 Mar 25 18:08 .bumpversion.cfg
-rw-r--r--   1 adnan  staff    6515 Mar 25 18:08 .config.ini
-rw-r--r--   1 adnan  staff    5805 Mar 27 18:44 .config.override.ini
drwxr-xr-x  17 adnan  staff     578 Mar 27 23:36 .git
-rwxr-xr-x   1 adnan  staff    2702 Mar 25 18:08 .gitignore
```

### p. more

展示文件的开始部分（使用空格移动，输入 `q` 退出）。

### q. mv

移动文件

```bash
mv filename1 filename2
```

`filename1` 是源文件路径，`filename2` 是文件将要移动到的路径。

甚至可以重命名：

```bash
mv old_name new_name
```

### r. rm

删除文件。在目录中使用这个命令会报错：`rm: directory: is a directory`。要删除目录需要传入 `-r`，这样就会递归删除整个目录的内容。也可以传入 `-f` 强制删除文件，*而不会有任何提示*。

### s. tail

输出文件的后10行。使用 `-f` 输出附加的数据。（译者注：只是输出，貌似不能保存）

```bash
tail [-f] filename
```

### t. touch

更新文件的访问时间和修改时间。如果提供的文件名不存在，就差创建文件。

## 1.2 文本操作

















