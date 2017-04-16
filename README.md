# lucky.js框架说明

菜鸟一枚，为了练习JavaScript，跟着牛人尝试着利用原生js封装一个**类似jQuery**一样的框架，方便使用，顺便解决一下可能存在的兼容性问题。如有缘能看到此文章，欢迎批评指正。

利用JavaScript面向对象，进行框架封装。

> 面向对象三个作用：
> 1. 面向对象编程
> 2. 封装框架
> 3. 描述数据

## 引包

```
<script src="./lucky.js"></script>
```

**注意**：为了方便书写，对传入参数context跟jQuery统一，只能传入字符串。

#id/.class/tag 或者是 分组+层次的形式，因为其实现用的是`querySelectorAll`

## 暴露的接口


### 选择器接口：

```
// 获取id的DOM
$$.$id(id)
// 缩小搜索范围; tag和id
$$.$tag(tag, id)
$$.$class(classname, id)
// 分组选择器
$$.$group(str) 
// 使用querySelectorAll，可以selector分组/层次
$$.$all(selector, id)
```

使用举例：

```
let elements = $$.$all('.box1 span', 'container');
for (let i = 0; i < elements.length; i++) {
    elements[i].style.border = '1px solid red';
}
```

### 事件接口：

```
// 绑定事件
$$.$on(id, type, fn)
// 解绑事件
$$.$un(id, type, fn)
// 鼠标点击
$$.$click(id, fn)
// 鼠标移入
$$.$mouseover(id, fn)
 // 鼠标离开
$$.$mouseout(id, fn)
// 鼠标悬浮
$$.$hover(id, fnover, fnout)
// 获取事件event对象
$$.$getEvent(e)
// 获取事件event对象目标元素
$$.$getTarget(e)
// 阻止元素事件默认行为
$$.$preventDefault(e)
// 阻止事件冒泡
$$.$stopPropagation(e)
//事件委托 
$$.$delegate(pid, eventType, selector, fn)
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
$$.setStyle(doms, key, value);
// 获取样式
$$.getStyle(doms, key)
// 类似jQuerycss
$$.css(context, key, value)
// 元素高度宽度（含border）
$$.offsetWidth(id)
$$.offsetHeight(id)
// 元素高度宽度（不含border）
$$.clientWidth(id)
$$.clientHeight(id)
// 元素的滚动高度和宽度
$$.scrollHeight(id)
$$.scrollWidth(id)
$$.scrollTop(id)
$$.scrollLeft(id)
// 相对于定位的父盒子
$$.offset(id).left
$$.offset(id).top
// 元素的绝对位置：指该元素的左上角相对于整张网页左上角的坐标。
$$.absoluteOffset(id).left
$$.absoluteOffset(id).top
// 显示、隐藏元素
$$.show(context)
$$.hide(context)
```

使用： 

`$$.$setStyle('ul li', 'border', '1px solid yellow');`
`$$.hide('#parent div p')`


### 属性框架

```
// 类似jQuery的attr获取/设置属性
$$.attr(context, key, value)
// 删除元素的某个classname 
$$.removeClass(context, name)
// 添加classs属性
$$.addClass(context, name)
// 判断是否存在class属性的某个name
$$.hasClass(context, name)
```

### 内容框架

```
// 获取内容
$$.html(context, value)
```

### 缓存

### AOP