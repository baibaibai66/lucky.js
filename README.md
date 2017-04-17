# lucky.js框架说明

[TOC]

菜鸟一枚，为了练习JavaScript，跟着牛人尝试着利用原生js封装一个**类似jQuery**一样的框架，方便使用，顺便解决一下可能存在的兼容性问题。如有缘能看到此文章，欢迎批评指正。

利用JavaScript面向对象，进行框架封装。

> 面向对象三个作用：
> 1. 面向对象编程
> 2. 封装框架
> 3. 描述数据

## 知识跟不上想法

1. 无法扩展/插件
2. 没有添加动画接口
3. jQuery样式接口只完成几个，因为想模块化，而现在只单一写在原型对象里

先放这里，以后有空再研究jQuery...

## 引包

```
<script src="./lucky.js"></script>
```

## jQuery样式接口

几个接口：

```
$$(selector).css(key, value)
$$(selector).show()
$$(selector).hide()
$$(selector).attr(key, value)
```

使用方法：

```
$$('#ul li.current').attr('class');

$$('#ul li.current').css('background-color', 'red').attr('class')
```

## 传统接口

**注意**：为了方便书写，对传入参数context跟jQuery统一，只能传入字符串，就别传DOM了。

#id/.class/tag 或者是 分组+层次的形式，因为其实现用的是`querySelectorAll`

### 选择器接口：

```
// 获取id的DOM
Lucky.$id(id)
// 缩小搜索范围; tag和id
Lucky.$tag(tag, id)
Lucky.$class(classname, id)
// 分组选择器
Lucky.$group(str) 
// 使用querySelectorAll，可以selector分组/层次
Lucky.$all(selector, id)
```

使用举例：

```
let elements = Lucky.$all('.box1 span', 'container');
for (let i = 0; i < elements.length; i++) {
    elements[i].style.border = '1px solid red';
}
```

### 事件接口：

```
// 绑定事件
Lucky.$on(id, type, fn)
// 解绑事件
Lucky.$un(id, type, fn)
// 鼠标点击
Lucky.$click(id, fn)
// 鼠标移入
Lucky.$mouseover(id, fn)
 // 鼠标离开
Lucky.$mouseout(id, fn)
// 鼠标悬浮
Lucky.$hover(id, fnover, fnout)
// 获取事件event对象
Lucky.$getEvent(e)
// 获取事件event对象目标元素
Lucky.$getTarget(e)
// 阻止元素事件默认行为
Lucky.$preventDefault(e)
// 阻止事件冒泡
Lucky.$stopPropagation(e)
//事件委托 
Lucky.$delegate(pid, eventType, selector, fn)
```

### 类型判断

```
isNumber(val)
isBoolean(val)
isString(val)
isUndefined(val)
isObj(val)
isNull(val)
isArray(val)
```

### CSS接口

```
// 设置样式
Lucky.setStyle(doms, key, value);
// 获取样式
Lucky.getStyle(doms, key)
// 类似jQuerycss
Lucky.css(context, key, value)
// 元素高度宽度（含border）
Lucky.offsetWidth(id)
Lucky.offsetHeight(id)
// 元素高度宽度（不含border）
Lucky.clientWidth(id)
Lucky.clientHeight(id)
// 元素的滚动高度和宽度
Lucky.scrollHeight(id)
Lucky.scrollWidth(id)
Lucky.scrollTop(id)
Lucky.scrollLeft(id)
// 相对于定位的父盒子
Lucky.offset(id).left
Lucky.offset(id).top
// 元素的绝对位置：指该元素的左上角相对于整张网页左上角的坐标。
Lucky.absoluteOffset(id).left
Lucky.absoluteOffset(id).top
// 显示、隐藏元素
Lucky.show(context)
Lucky.hide(context)
```

使用： 

`Lucky.$setStyle('ul li', 'border', '1px solid yellow');`
`Lucky.hide('#parent div p')`


### 属性框架

```
// 类似jQuery的attr获取/设置属性
Lucky.attr(context, key, value)
// 删除元素的某个classname 
Lucky.removeClass(context, name)
// 添加classs属性
Lucky.addClass(context, name)
// 判断是否存在class属性的某个name
Lucky.hasClass(context, name)
```

### 内容框架

```
// 获取内容
Lucky.html(context, value)
Lucky.empty(context)
Lucky.remove(context)
```

### 动画框架

### 缓存

### AOP