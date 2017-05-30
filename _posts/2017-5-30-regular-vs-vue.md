---
layout: post
title: Regular vs Vue
banner: pexels-photo-96858.jpeg
tags: mvvm
---

[Regularjs](http://regularjs.github.io/)算是我的 mvvm 框架的启蒙了，而且大部分的项目都是在此基础上完成。最近接到了一个内部系统项目，时间紧迫，最终选择了使用 [Vue](https://vuejs.org/) 来做，当然也是自己想尝尝鲜。一方面 Vue 上手确实简单，并且自己也有了对 mvvm 的一定了解，所以只用了一天看文档，选择 [ElementUI](http://element.eleme.io/#/zh-CN)，然后看 ElementUI 的文档，就开始了开发，最后只用了两天就完成了整个后台的前端工作。在使用了 Vue 过程，发现其实 Regular 和 Vue 其实还是很像的，两者都是关注构建 UI 的 mvvm 库，都很小巧，都有一些 mvvm 一些概念（过滤器、计算属性等等），而且从 API 上看都是比较类似的。不过两者的数据监听原理、数据传递、以及使用方法等等还是有不少差异，本文从我的理解触发，比较一下两者。

## 模板语法

### 功能语句

Regular 使用的是一种类似 FreeMarker（Java 模板）的语法，比如条件语句：`{#if value} {/if}`，循环语句：`{#list Expression as Var } ... {/list}`；而 Vue 则是直接绑定在元素上：`<div v-if="value"></div>` 以及 `<p v-for="item in items"></p>`。

### 插值语句

两者渲染值的时候都是以大括号作为标记，Vue 默认使用两对对大括号，Regular 默认使用一对大括号`{}`，可以通过 `Regular.config` 来配置。

其次，Regular 的大括号插值可以用在想渲染的任何地方，比如属性、样式和 style；而 Vue 则区分的比较细致，比如要绑定属性需要使用 `v-bind` 指令。

对于样式和样式，Regular 提供了 `r-class` 和 `r-style` 指令，Vue 则继续使用 `v-bind` 属性，并提供了[较多的方式](https://cn.vuejs.org/v2/guide/class-and-style.html)。

## 组件

Regular 和 Vue 都是通过 extend 方法扩展实例，并且也表明了声明周期，语法略有不同。

```js
// regularjs
var regularInstance = Regular.extend({
    template: '<p></p>',
    name: 'my-component',
    config: function() {
        // 数据初始化
    },
    init: function() {
        // 节点已经生成，但还没插入 DOM
    },
    function1: function() {},
    function2: function() {},
    computed: {
        // 计算属性
    }
})

regularInstance.filter('filter1', function() {/* ... */})

// vue
var vueInstance = Vue.extend({
    template: '<p></p>',
    created: function() {},
    methods: {
        // 方法
    },
    filters: {
        // 过滤器
    },
    computed: {
        // 计算属性
    }
})
```

不同的是，`Regular.extend` 同时也是定义了组件，通过 `name` 属性定义了组件的名称；而 Vue 定义组件需要使用 `Vue.component` 方法定义。不过 Regular 也提供了 component 方法。

### 组合和内嵌

Regular 提供了 [`this.$body`](http://regularjs.github.io/guide/zh/component/composite.html)，而 Vue 中是 [`slot`](https://cn.vuejs.org/v2/guide/components.html#使用-Slot-分发内容)。

## 动画

Regular 提供了 [`r-animation`指令](http://regularjs.github.io/guide/zh/basic/animation.html)来提供动画实现；Vue 则是使用 [`transition` 组件](https://cn.vuejs.org/v2/guide/transitions.html)实现。对于复杂的动画，两者都推荐使用专业的动画 JS 库实现。

## 父子组件数据传递

Regular 父组件可以传递任何数据给子组件，而 Vue 子组件要显式地用 props 选项声明它期待获得的数据。

## 数据监听方式

Regular 使用脏检查来实现数据绑定， Regular 作者如此评论这种方式：

> 脏检查完全不关心你改变数据的方式，而常规的set, get的方式则会强加许多限制
脏检查可以实现批处理完数据之后，再去统一更新view.
脏检查其实比 GET/SET 更容易实现。脏检查是个单向的检查流程(请不要和双向绑定发生混淆)，可以实现_任意复杂度的表达式支持。而get/set的方式则需要处理复杂依赖链，基本上表达式支持都是阉割的(使用时就像踩雷).

确实是这样，在 Vue 里会有比较多的限制，比如必须组件初始化的时候显式的声明数据、[数组更新检测限制](https://cn.vuejs.org/v2/guide/list.html#数组更新检测)。

不过脏检查令人诟病的便是其性能问题，作者做了[大量优化](https://github.com/regularjs/regular/milestone/7?closed=1)。

## 状态管理

因为数据绑定的方式不用，状态管理的方式也不同，Regular 推荐使用 Redux 和不可变数据来管理状态，而 Vue 则提供了 Vuex 来实现状态管理。














