---
layout: post
title: Simple Algorithms 笔记
banner: macbook-computer-clean-hero.jpg
tags: algorithms
---

最近想补一下基本的算法，恰好看到了这个[网站](http://algorithms.openmymind.net/)，作者在这里介绍了一些平时工作中很基础的算法，正好适合我这种算法小白来看，而且是基于 JavaScript 实现的。本文并不是逐字翻译，只是对读完这些内容的一个总结。

本站的源码托管在 [Github](https://github.com/karlseguin/Algorithms) 上。


## 线性查找

线性查找是最基本的搜索算法，线性查找对数据集合依次查找匹配项。

```js
function findIndex(values, target) {
  for(var i = 0; i < values.length; ++i){
    if (values[i] == target) { return i; }
  }
  return -1;
}
findIndex([7, 3, 6, 1, 0], 6)
```

线性查找最坏的情况就是将整个集合遍历一遍，要么是匹配项是最后一个，要么就是没有找到匹配项。也就是说你的集合中有 N 项，那么最坏的情况下就要对集合迭代 N 次，也就使我们所说的 *O(N)* ([使用大 O符号](http://en.wikipedia.org/wiki/Big_O_notation))。搜索速度依赖于你集合的大小。

线性查找不要求集合是排序的。

在一些情况下，你可能知道有些项会被经常用到，你可以把这写项放到集合开始处，这样不论集合多大，索索都会快很多。

## 数组

传统概念上，数组是多个占据相邻区域的元素的集合。这样做有许多好处，一是一个数组一旦创建就不能改变长度（因为相邻的区域可能已经被占用），第二是数组可以通过序号（[x]）随机获取。

在许多语言中，数组长度是可以增加的，这种叫做动态数组。这是如何实现的呢？一旦一个数组被填满，就就寻找一块更大的内存地址，然后将之前的数组的元素复制到新地址内。

```js
function ArrayList(initialLength) {
  this.length = 0;
  this.array = new Array(initialLength);

  this.add = function(value) {
    if (this.length == this.array.length){
      this.grow();
    }
    this.array[this.length++] = value;
  };
  this.grow = function() {
    var original = this.array;
    this.array = new Array(this.length * 2);
    for(var i = 0; i < this.length; ++i) {
      this.array[i] = original[i];
    };
  }
}
var array = new ArrayList(1);
array.add(2);
array.add(9);
array.add(4);
```

向一个填满的动态数组插入新元素，就会执行一次数组长度增长算法，这个算法的实现对性能有很大的影响。

现实世界中，最常用的固定长度数组就是字符串了，也即是字符数组。和其他数组一样，在初始化的时候长度就确定了。这也就是为什么大家都说字符串是 *不可变* 的，并且多次拼接字符串会导致性能问题。就像动态数组一样，当有新值串拼接时，必须给字符串分配新的更大的空间，然而它又不像动态数组是在编译时处理的，并且动态数据也没有使用 buffer。也就是说给字符串拼接新值，也只会分配刚刚好的空间。

最重要的一点是，在使用动态数组时，如果能预见到会对数组进行对此插入操作，那么最好最开始就给数组设置一个适当的长度。比如你设置数组初始长度为20，如果你要插入10000个值，数组的长度要增长9次，这样就会导致你的内存出现8个碎片，导致额外的压缩工作。

一些语言中，比如 Ruby 是完全依赖动态数组的，还有一些语言，像 C#、Java，两种数组都提供了。在现在的环境下，很难有那种确定使用固定长度数组的情况了。

**译者注：**

在本文的下面有人提到 JavaScript 的数组其实是个对象，并不是传统意义上的数组，不过又有人在下面指出，虽然理论上是这样，但 JavaScript 引擎优化代码的时候，如果引擎能确定代码只是使用了数组的方法，那么引擎就会把它处理成真正的数组

## 链表

链表和数组不同，拥有利用不连续空间的能力。那链表是如何将元素串联起来的呢？在下面的实现中，链表的每个节点都包含自身的值和下一个节点的引用。所以链表是通过每个节点来查找其相邻的节点。

```js
 function LinkedList() {
  this.head = null;
  this.tail = null;

  this.add = function(value) {
    var node = new Node(value);
    if (this.head == null) { this.head = node; }
    if (this.tail != null) { this.tail.next = node; }
    this.tail = node;
  };
}

function Node(value) {
  this.value = value;
  this.next = null;
}

var list = new LinkedList();
list.add(1);
list.add(2);
list.add(3);
```

操作链表就是更新 `head`、`tail`以及 `next` 的引用：

```js
 this.removeAt = function(index) {
  var prev = null;
  var node = this.head;
  var i = 0;
  while (node != null && i++ < index) {
    prev = node;
    node = node.next;
  }
  if (prev == null) { this.head = node.next;}
  else { prev.next = node.next; }
};
list.removeAt(1);
```

我们所使用的内存并不总是那么富足，这个时候链表就很有优势。链表可以利用碎片化的空间，有较好的插入性能，但是查找性能就没那么好了。

每个节点也可以有一个前几个节点的引用，这就是所谓的双向链表。这样处理起来其实会更加复杂（必须同时处理两个应用），不过这样使得插入和删除变得简单。

链表对内存的友好已经不是最大的优势了，动态数组更符合现代应用的使用场景。然而链表一个更实用的实现是用来构建其他数据结构，比如堆栈和队列。

## 散列表（Hash Table）

散列表是一种可以充分利用其他数据结构高级数据结构。散列表中每一个存储单元叫做桶（bucket）。每个桶基于散列函数得到的键作为存储标记。下面使用数组来实现存储数据。通过散列函数计算出键，得到需要存储的数据的索引。通常来说，散列表用来存储键值对。

```js
function HashTable(size) {
  this.size = size;
  this.buckets = new Array(size);

  this.add = function(value) {
    var index = this.hash(value);
    this.buckets[index] = value;
  };
  this.hash = function(value) {
    var sum = 0;
    for (var i = 0; i < value.length; ++i) {
      sum += value[i].charCodeAt() - 97;
    }
    return sum % this.size;
  };
}

var hash = new HashTable(3);
hash.add('fear');
hash.add('is the');
hash.add('little death');
```

*散列函数* 在其中扮演了重要的角色。我们的实现中只是得到每个字符的ascii的和（减掉97），然后通过取余数来适用我们的固定数组。最后一步是保证散列函数返回介于0和数组长度之前的值。

散列表需要解决 *碰撞* 问题。碰撞是指两个值可能会得到相等的索引值。这个可能性还是很大的，参看[生日问题](http://en.wikipedia.org/wiki/Birthday_problem)。一种方法是每个桶都使用自己的数据结构实现，在这里我们使用链表，这样即使碰撞，数据也并不会被覆盖。

```js
function HashTable(size) {
  this.size = size;
  this.buckets = new Array(size);
  for(var i = 0; i < size; ++i) {
    this.buckets[i] = new LinkedList();
  }
  this.add = function(value) {
    var index = this.hash(value);
    this.buckets[index].add(value);
  };
  this.hash = function(value) { ... };
}

var hash = new HashTable(5);
hash.add('i');
hash.add('will');
hash.add('face');
hash.add('my');
hash.add('fear');
```

通常来说，散列表轻量快速。也就是说，如果没有碰撞，读写性能都是很高的。然而如果有碰撞的话，性能就依赖于碰撞处理算法的实现了。同时，如果散列函数的结果没有很好的均匀分配，读写性能差异也很显著。

散列表被广泛应用于现代应用中。通过键值对存储数据，使用键来查找对应的值，而不是依赖线性查找。唯一需要注意的是：不要使用一个自定义的散列函数，而是使用一个自定义的对象来作为键。











