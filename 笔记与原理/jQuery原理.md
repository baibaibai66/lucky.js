# jQuery原理

[TOC]

原生 --> 函数封装 --> 


## 这种形式，如何实现？

`$('#box1').hide()`

如果只是定义函数：

```
// 返回DOM元素
var $ = function(id) {
    return document.getElementById(id);
}
```

这样只是返回DOM对象，可是**DOM对象里面没有hide方法**

### 方法一 -- 改造/破坏内置对象

**jQuery刚开始实现链式访问原理 -- 扩充HTMlElement源性对象方法**

一个 HTML 文档中的每个元素都有和元素的 HTML 属性对应的属性。这里列出了所有 HTML 标记都支持的属性。其他的属性，都特定于某种具体的 HTML 标记。HTMLElement 对象继承了 Node 和 Element 对象的标准属性，也实现了下面所描述的几个非标准属性：

```
// DOM元素的原型对象方法
HTMLElement.prototype.hide = function() {
    this.style.display = 'none';
}
```

现在可以了`$('#box1').hide()`

> The HTMLElement interface represents any HTML element. Some elements directly implement this interface, others implement it via an interface that inherits it.

**内置对象扩充 -- 但是污染了全局环境 -- 不可取**

### 方法二 -- 使用对象 -- 也不难理解 -- 但是很重要

在对象中引入`this.elements`属性，什么意思呢？

就是之前写hide(context)函数的时候，需要传入参数，然后通过参数再获取DOM元素（HTMLElement）

现在，既然不需要传参了，那么DOM节点从哪里来？

在构造函数对象中，定义一个存放DOM节点的属性`this.elements = [];`

```
// 构造函数对象
// 传参立即执行$all()，将DOM元素放this.elements里面，后return $all()的return(构造函数对象)
function lucky(context) {
    this.elements = [];
    return this.$all(context);
}

lucky.prototype = {
    // construtor: $$$,
    $all: function(selector) {
        this.elements = document.querySelectorAll(selector);
        return this;
    },
    hide: function() {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].style.display = 'none';
        }
        return this;
    },
    setStyle: function(key, value) {
        let doms = this.elements;
        for (let i = 0, len = doms.length; i < len; i++) {
            doms[i].style[key] = value;
        }
    }
};
// 实例化
var $$$ = function(context) {
    return new lucky(context);
}
```