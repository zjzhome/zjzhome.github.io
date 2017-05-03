---
layout: post
title: 开发问题记录
banner: pexels-photo-92628.jpeg
tags: develop 
---

在开发中经常会遇到一些匪夷所思的问题，而当解决之后才发现其实并不是什么难题，或许是兼容性、或许是理解不够。总之，记录在这里，方便日后查阅。

## 水平垂直居中模糊

自从 CSS3 加入了 `transform` 属性，实现水平垂直居中变的异常简单。但这里有一个坑，比如一个居中的弹框，有时候会会出现整个弹窗或者文字模糊的情况。经过一番排查，发现居中的弹框不是的宽高是奇数。
**居中的元素宽高一定要是偶数**

## 直接修改不可变数据

我们在新项目中使用了 Regular 和 Redux，Redux 的流程很清晰：用户操作触发 action，进入 reducer 处理数据，最终导致页面UI的更新。Regular 的更新需要调用一个 `$update` 方法（比如 ajax，一般像点击之类的事件 Regular 是可以主动触发更新的）。有的同学无意间在 action 阶段就直接修改了 state 里的数据，当调用 `$update` 的时候，并没有检测到数据变化，导致一些逻辑无法执行。

所以 Vuex 开发者模式下，如果不通过 commit 提交修改会报一个警告，防止开发者直接修改数据。

## IE 上传文件

在IE中实现上传功能时，需要将响应头的 Content-Type 设置为 text/plain 或 text/html，而不能是 application/json，否则IE会提示用户下载返回的数据。

## jquery ui sortable 的坑

页面的 body 的 overflow 属性如果发生变化，比如弹窗，一般弹窗后我们会将 body 的 overflow 设置为 hidden，弹窗消失重新设置为 auto。这样的变化就会导致 sortable 有问题，在拖动的时候导致位置计算错误。


