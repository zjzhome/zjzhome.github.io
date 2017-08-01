---
layout: post
title: mocha-phantomjs 问题
banner: mocha-test.jpeg
tags: mocha chai phantomjs
---

为了更好的项目质量，准备在一些项目中引入前端测试，选择了 Mocha、Chai，虽然 Mocha 本身是支持浏览器的，但必须要打开浏览器查看网页才可以知道测试结果，为了可以直接使用命令行和 Nodejs 测试一样方便，使用 mocha-phantomjs。

本来以为直接 `npm install -g mocha-phantomjs` 或者 `npm install --save-dev mocha-phantomjs` 即可，不过在运行 `mocha-phantomjs /test/index.html` 命令的时候，报错：`phantomjs terminated with signal SIGSEGV`。Github 上也有人提过 [issue](https://github.com/nathanboktae/mocha-phantomjs/issues/217)。

有人提到：通过 homebrew 重装，使用 mocha-phantomjs 的 -p 命令手动指定 phantomjs 的位置，这样操作之后，上述错误没有了，却报了 Bad arguments 的错误。

最后还是去官网下载 zip 包，解压到指定位置，再使用 -p 命令指定目录，解决。

从搜索结果看，这些bug都是 Mac 用户反馈，而且 phantomjs 主要贡献者已经退出了phantomjs 的开发。。。

### mocha 参考文档  
- [Mocha 官网](https://mochajs.org/#examples)
- [测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)