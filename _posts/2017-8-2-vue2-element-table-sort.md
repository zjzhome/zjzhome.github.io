---
layout: post
title: Vue2 ElementUI 实现 Table 拖动排序
banner: pexels-photo-96858.jpeg
tags: vue2 element table
---

新项目的后台选择了 Vue2 作为开发框架，UI 组件选择了饿了么出品的 ElementUI，总体来说写的还是很爽的。在后台项目中有很多使用 table 展示数据的场景，ElementUI 提供的 el-table 组件很好的满足了展示筛选和选中，不过并没有提供数据拖动排序的支持。

最开始实现 table 的排序思路和[手摸手，带你用vue撸后台 系列三(实战篇)](https://segmentfault.com/a/1190000009762198#articleHeader5)差不多，基于 [Sortable](https://github.com/RubaXa/Sortable)，在 table 组件 mounted DOM 之后，操作 DOM，手动管理列表：

```js
// 代码摘自 https://segmentfault.com/a/1190000009762198#articleHeader5
import Sortable from 'sortablejs'
let el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
let sortable = Sortable.create(el)

this.sortable = Sortable.create(el, {
  onEnd: evt => { //监听end事件 手动维护列表
    const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
    this.newList.splice(evt.newIndex, 0, tempIndex);
  }
});
```

不过在 MVVM 中出现 DOM 操作总感觉不太完美。看一下选择器就知道找到可以拖动的 tbody 不容易，所以直接扒了 ElementUI el-table 的 DOM 结构，用 div 重写 table 组件，然后使用 [Vue.Draggle](https://github.com/SortableJS/Vue.Draggable)。

```html
<div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition">
    <div class="el-table__header-wrapper">
        <div style="display:table;width:100%;background:#eef1f6;" class="el-table__header">
            <div style="display: table-row;">
                <div class="el-table_1_column_1 is-leaf ts-table-td">
                    <div class="cell">编号</div>
                </div>
                <div class="el-table_1_column_5 is-leaf ts-table-td" style="width:150px;">
                    <div class="cell">标题</div>
                </div>
                <div class="el-table_1_column_7 is-leaf ts-table-td" style="width:150px;"><div class="cell">操作</div>
                </div>
            </div>
        </div>
    </div>
    <div class="el-table__body-wrapper">
        <draggable :list="list" 
            :options="{draggable:'.sortbale-item', dragClass: 'drag-handle', chosenClass: 'chosen-handle', disabled: !isSorting}" 
            style="display:table; width: 100%;" class="el-table__body">
            <div style="display: table-row;" class="el-table__row sortbale-item" 
                v-for="(item, index) in list">
                <div style="width:50px;" class="ts-table-td">
                    <div class="cell">
                        <p v-if="isSorting"><i class="ion-arrow-move"></i></p>
                        <p v-if="!isSorting">{{ index + 1 }}</p>
                    </div>
                </div>
                <div class="ts-table-td">
                    <div class="cell">
                        <p>{{ item.title }}</p>
                    </div>
                </div>
                <div class="ts-table-td" style="width:150px;">
                    <div class="cell">
                        <el-button type="primary" size="mini" @click="update(item, index)">编辑</el-button>
                    </div>
                </div>
            </div>
        </draggable>
    </div>
</div>
```


将组件的 list 数据传递进入，拖动之后 list 自动改变，省去了手动管理数据的麻烦。

不过代码量明显增加了，看个人喜好了~ 不过这让我对 `display:table` 的好感又增加了好多。







