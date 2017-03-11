---
layout: post
title: 详解 Webpack
banner: webpack.jpg
tags: webpack,javascript
---

JavaScript 模块打包工具已经出现有一段时间了。RequireJS 在2009年完成了第一次提交，然后 Browserify 随之出现，从那时候起相继出现了各种模块打包工具。在这些里面，*webpack*脱颖而出。如果你还不熟悉它，我希望这篇文章可以帮你开始使用这个强大的工具。

## 什么是模块打包工具

在大多数语言中（包括 ECMAScript 2015+，JavaScript 的最新标准，但还没有被浏览器广泛支持），你可以将代码分割成多个文件，然后将这些文件导入到你的应用中，来使用他们所包含的功能。浏览器并没有内建这样的功能，所以模块打包工具如果要实现这些功能，有以下几种方式：异步加载模块，在加载完成后执行；或者是将所有需要的文件合并成一个 JavaScript 文件，在 HTML 里通过 `<script>` 标签加载。

不使用模块管理和打包工具，你也可以手动合并你的文件，然后使用数不清的 `<script>` 标签引入，不过这样做缺点也很明显：

* 你需要保证需要加载的文件的顺序，包括文件的依赖关系以及你要保证不要加载那些你不需要的文件。
* 越多的 `<script>` 的标签意味着要加载你的代码需要更多的服务器请求，影响性能。
* 很明显，这需要大量的手动操作，而不是让计算机来做处理。

大多数的模块打包工具可以很简单的和 npm 或者 Bower 集成，这样你就可以为你的应用添加第三方依赖。你只需要安装并且用一行代码导入到你的应用中。然后运行打包工具，你的应用代码就和第三方代码合并到一起；或者你配置正确，你可以把你所有的依赖代码打包到另外一个文件里，这样当你更新了应用的代码，用户更新应用代码的缓存时候，就不必重新下载这些依赖库的代码。

## 为什么选择 Webpack

现在你已经基本了解 webpack 的作用了，但为什么你要选择 webpack，有这么几个原因：

* 其中一个优势是相对来说它比较新，所以它能够避免之前的工具们存在的一些缺陷和问题。
* 上手简单。如果你只是想要把所有 JavaScript 文件打包成一个文件，而不做其他事情，你甚至都不需要配置文件。
* 它的插件系统可以做更多的事情，使得它更加强大，所以，或许构建工具，一个 webpack 足够了。

我见过一些其他和 webpack 功能类似的打包和构建工具，但 webpack 更胜一筹：当你遇到困难时你可以去庞大的社区寻找帮助。Browserify 的社区也挺大，但是它缺少一些 webpack 具有的潜在的必需的特性。我把所有的赞誉都给了 webpack，你们一定等我开始 show my code 了，开始吧 ~

## 安装 Webpack

在使用 webpack 之前，我们首先需要安装它。我假设你已经安装了 Nodejs 和 npm，如果你还没安装他们，查看 [Nodejs 官网](https://nodejs.org/)。

有两种方式来安装 webpack（其实其他命令行程序也是一样）：全局安装和局部安装。如果你选择全局安装，你可以在任意目录下使用，但是它不会作为你局部依赖存在，并且你不能在不同的项目之间切换 webpack 的版本（一些项目可能需要更新一点的版本，你可能不得不等一等再升级）。所以对于命令行程序我更倾向于局部安装，然后使用相对路径或者 [npm scripts](https://docs.npmjs.com/misc/scripts) 来运行程序。如果你没有局部安装过命令行程序，你可以读一下我写的一篇文章，关于摆脱[全局安装 npm 包](https://www.joezimjs.com/javascript/no-more-global-npm-packages/)。

接下来我们会使用 npm scripts 来进行我们的例子，所以我们依然局部安装 webpack。首先为了试验和学习 webpack，我们先创建一个目录。你可以克隆我 [github 上的仓库](https://github.com/joezimjs/webpack-Introduction-Tutorial)，在接下来的学习中你可以切换分支；或者你可以重新创建一个新的项目，然后使用我仓库中的代码作为比较。

通过命令行进入你的项目目录，使用 `npm init` 初始化项目，除非你要把项目发布到 npm 上，否则，你填入什么项目信息并不重要。

这时候你项目里增加了一个 `package.json` 文件（通过`npm init`创建），你可以把依赖保存在这里。所以我们使用 npm 安装 webpack 为项目的一个依赖项：`npm install webpack -D`。（使用 `-D` 代表这是一个开发依赖，保存在 `package.json` 的 `devDependencies` 里，你也可以使用 `--save-dev` ）。

在使用 webpack 在之前，我们需要创建一个简单的应用。首先我们安装 [lodash](http://www.lodash.com/)，这样我们的应用就有一个依赖：`npm install lodash -S`（`-S` 同 `--save`），然后我们创建一个名为 `src` 的目录，在里面创建一个文件： `main.js`：

```js
var map = require('lodash/map');

function square(n) {
    return n*n;
}

console.log(map([1,2,3,4,5,6], square));
```

很简单对不对？我们创建一个从1到6的数字数据，然后使用 loadsh 的 map 方法将原数组每一项平方得到一个新的数组。最后我们通过 console 打印出新数组。这个文件可以使用 Nodejs 运行，运行 `node src/main.js` 输出结果为 `[ 1, 4, 9, 16, 25, 36 ]`。

但是我们想将这段短小的代码和我们需要的 lodash 代码打包，并且可以在浏览器运行，webpack 可以做到么？我们该怎么做？

## 使用 Webpack 命令行

使用 webpack 最简单的方法就是直接命令行运行，而不用去花费时间去写一个配置文件。最简单的 webpack 命令行，不必使用配置文件，只需要输入文件路径和输出文件路径两个参数。Webpack 会读取输入文件，遍历依赖树，将所有文件打包成一个文件，输出到你指定的输出文件路径。在这个例子中，我们的输入路径是 `src/main.js`，我们想把打包文件输出到 `dist/bundle.js`，所以我们来创建一个 npm scripts 来做这件事情（我们没有全局安装 webpack，所有不能直接从命令行运行），在 `package.json` 中，编辑 `scripts` ：

```json
"scripts": {
"build": "webpack src/main.js dist/bundle.js"
}
```

现在，运行 `npm run build`，webpack开始工作，当运行完毕——不会很长时间——会生成一个新的 `dist/bundle.js` 文件。你可以在 nodejs 或者 浏览器中运行打包后的文件，你会得到同样的输出结果。

在继续探索 webpack 之前，我们先完善一下构建脚本：重新构建之前先删除 `dist` 目录及其内容，并且增加一些脚本来运行打包后的文件。首先我们安装 `del-cli` 来删除目录，这样不会让使用不同系统的人感到苦恼（不要恨我，我用的 windows）；运行`npm install -D`安装。然后我们更新 npm scripts：

```json
"scripts": {
  "prebuild": "del-cli dist -f",
  "build": "webpack src/main.js dist/bundle.js",
  "execute": "node dist/bundle.js",
  "start": "npm run build -s && npm run execute -s"
}
```

`build` 命令和之前一样，增加了 `prebuild` 来做一些清理工作，这个命令每次都会先于 `build` 运行，同时增加 `execute` 命令，使用 nodejs 运行打包后的脚本。然后使用 `start` 运行所有的命令（`-s` 可以让 npm scripts 不会输出一些无用的信息）。运行 `npm srart`，你可以看到 webpack 的输出，开平方后的数组打印在了控制台上。恭喜你，你完成了之前我提高的仓库的 `example1` 分支的所有工作。

## 使用配置文件

虽然我们愉快的使用命令开始使用 webpack，但当我们开始使用 webpack 更多的特性的时候，你会把所有传进命令行的配置项都移入配置文件中，使用配置文件，功能更强大，代码更加易读。因为它是用 JavaScript 写成的。

让我们创建一个配置文件。在你项目的根目录，创建一个名为 `webpack.config.js` 的文件，这是 webpack 默认查找的文件。你也可以给 webpack 传入 `--config [filename]`，告诉 webpack你想使用不同名字或者其他目录的配置文件。

在本教程中，我们使用标准的文件名。现在我们使用配置文件来完成上面我们使用命令行完成的任务。我们在配置文件中添加几行代码：

```js
module.exports = {
    entry: './src/main.js',
    output: {
        path: './dist',
        filename: 'bundle.js'
    }
};
```

就像在命令行中一样，我们指明了输出文件和输入文件。这是一个 JavaScript 文件，不是 JSON，所有我们需要到处配置对象 - 使用 `module.exports`。现在可能看起来不如命令行中优雅，不过读到文章最后，你会对这个决定感到欣喜的。

现在我们可以从 `package.json` 中移除传给 webpack 的命令行参数了，你的 scripts 看起来应该是这样：

```json
"scripts": {
  "prebuild": "del-cli dist -f",
  "build": "webpack",
  "execute": "node dist/bundle.js",
  "start": "npm run build -s && npm run execute -s"
}
```

你依然可以运行 `npm start`，并得到相同的结果。这样我们就完成了 `example2` 分支的内容。

## 使用 Loader

## 使用 Handlebars Loader

## 使用插件

## 懒加载

## 创建 Vendor Chunk













