---
layout: post
title: 我眼中的 webpack
banner: webpack.jpg
tags: webpack
---

在大大小小的项目上也用过几次 webpack 了，最开始的时候并没有感觉到一切皆模板的好处，直到进入新的项目组，着手做了[网易推手](http://ts.163.com/)这个项目之后。

用户开通网易推手之后，可以分享商品获得粉丝，粉丝购买后获取收益，暂时基于考拉。当推手浏览商品信息时，需要展示收益信息，类似这样：

![收益信息](/images/webpack/demo.jpg)

那个收益信息，考拉商品页面并没有，最后给出的方案就是插入一段 js 到页面内，其他事情考拉页面无需考虑，降低沟通的成本。

收益的展示其实不光涉及到了逻辑，还有DOM结构、样式等。这个时候 webpack 的优势就显现出来了：一切皆模块。

我可以在 js 引入样式资源，在 js 中引入模板资源，基于 loader 还可以随心所欲的使用各类预处理器，这在以前几乎不可想象。最后呢，使用 webpack 打包出一个个独立的文件，丢给第三方即可。

```js
require('../mcss/style.mcss')
require('../tpl/tpl.rgl')
var config = require('./config.js')

// ...
```

webpack 也开始可刷版本号之旅，观望下，可以用上了。
