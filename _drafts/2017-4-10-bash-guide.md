---
layout: post
title: Bash 操作指南
banner: sort.jpg
tags: bash
---

换了 Mac，装了 iTerm 2，开始慢慢习惯在命令行下敲敲打打，借此学习下 bash 相关的基本操作。本文翻译自 [https://github.com/Idnan/bash-guide](https://github.com/Idnan/bash-guide)。

## 基本操作

### a. export

罗列所有的环境变量。使用 `echo $VARIABLE_NAME` 获取特定变量的详细内容。

```bash
export 
```

Example：

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













