## CSS框架

为了解决浏览器不兼容，框架封装一些常用的有关CSS的操作(增删查改)

1. 原生样式设置：ele.style.backgroud/backgroundColor/color/width/

2. jQuery：$('ele').css(key, value)/width/height/hide/show
    
    输入一个参数：获取；输入两个：更改

访问CSS的两种方式：

1. 点语法 -- dom.style.color = 'red';
2. 键值对 -- dom.style['color'] = 'red'; -- 封住框架只能用这个

### 原生获取样式，有问题

1. 动态添加的样式，无法获取
2. 通过class添加的样式，无法获取
3. 只能获取行内设置的样式

js中提供了全局的getComputedStyle('元素', '伪类');

IE中某些不支持getComputedStyle: IE用dom.currentStyle[key]

### 获取高度和宽度

元素 + 窗口 + 屏幕

元素 -- 实际的 -- 滚动条的

窗口