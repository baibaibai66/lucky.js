// 顶级模块
var $$ = function() {};
$$.prototype = {
    // 后面对象拷贝给前面；新增拷贝；该方法为了模块化
    extend: function(target, source) {
        for (var i in source) {
            target[i] = source[i];
        }
        return target;
    }
}
$$ = new $$();

// 基础模块
$$.extend($$, {

});
// ajax框架
$$.extend($$, {});
// 选择框架
$$.extend($$, {
    // 获取id的DOM
    $id: function(id) {
        return document.getElementById(id);
    },
    // 缩小搜索范围; tag和id
    $tag: function(tag, id) {
        if (typeof id == 'string') {
            id = $$.$id(id);
        }
        if (id) {
            return id.getElementsByTagName(tag);
        } else {
            return document.getElementsByTagName(tag);
        }
    }, // 下面这两种都是兼容的
    // $class('current', 'ul');
    // $class('current');
    // 参数 classname, id
    $class: function(classname, id) {
        let arr = [];
        // 1. 判断id的类型 -- string or dom
        if ($$.isString(id)) {
            id = $$.$id(id);
        }
        // 2. 根据id是否存在来决定是否缩小范围
        // 如果id不存在，还是在document层面去遍历
        if (!id) {
            id = document;
        }
        // console.log(id);
        // getElementsByClassName可以
        if (id.getElementsByClassName) {
            return id.getElementsByClassName(classname);
        } else {
            // 需要自己遍历
            let elements = id.getElementsByTagName('*');

            for (let i = 0; i < elements.length; i++) {
                // 处理多个class类名的情况
                let classes = elements[i].className.split(' ');
                for (let j = 0; j < classes.length; j++) {
                    if (classes[j] == classname) {
                        arr.push(elements[i]);
                    }
                }
            }
        }
        return arr;
    },
    // 类似jQuery多个标签形式 -- 多组选择器
    // $(".p1, .p3, #div3").css("border","2px solid red");  
    $group: function(str) {
        // 返回数组
        let arr = [];
        // 临时数组
        let list = [];
        // 按照格式进行分割，获取所以名字
        let names = str.split(',');
        // console.log(names);
        // 对每个元素名进行判断
        for (let i = 0; i < names.length; i++) {
            let item = names[i].trim();
            let first = item.charAt(0);
            // console.log(item);
            // 如果首字符是.或者#，去掉
            let name = item.substr(1);
            if (first === '.') {
                list = $$.$class(name);
                // console.log(list);
            } else if (first === '#') {
                list = [$$.$id(name)];
            } else {
                list = $$.$tag(item);
            }
            pushArr(list);
        }
        // 返回之前还不能去重呢...
        // set(arr);
        return arr;

        // function set(arr) {
        //     let obj = {};
        //     for (let i = 0; i < arr.length; i++) {
        //         obj[arr[i]] = 0;
        //     }
        //     return Object.keys(obj);
        // }

        function pushArr(list) {
            for (let i = 0; i < list.length; i++) {
                arr.push(list[i]);
            }
        }
    },
    // 层次选择器，有问题...
    $cengci: function(select) {
        //个个击破法则 -- 寻找击破点
        var sel = $$.trim(select).split(' ');
        var result = [];
        var context = [];
        for (var i = 0, len = sel.length; i < len; i++) {
            result = [];
            var item = $$.trim(sel[i]);
            var first = sel[i].charAt(0)
            var index = item.indexOf(first)
            if (first === '#') {
                //如果是#，找到该元素，
                pushArray([$$.$id(item.slice(index + 1))]);
                context = result;
            } else if (first === '.') {
                //如果是.
                //如果是.
                //找到context中所有的class为【s-1】的元素 --context是个集合
                if (context.length) {
                    for (var j = 0, contextLen = context.length; j < contextLen; j++) {
                        // $$.$class第二个参数是id，所以这里有问题
                        pushArray($$.$class(item.slice(index + 1), context[j]));
                    }
                } else {
                    pushArray($$.$class(item.slice(index + 1)));
                }
                context = result;
            } else {
                //如果是标签
                //遍历父亲，找到父亲中的元素==父亲都存在context中
                if (context.length) {
                    for (var j = 0, contextLen = context.length; j < contextLen; j++) {
                        pushArray($$.$tag(item, context[j]));
                    }
                } else {
                    pushArray($$.$tag(item));
                }
                context = result;
            }
        }

        return context;

        //封装重复的代码
        function pushArray(doms) {
            for (var j = 0, domlen = doms.length; j < domlen; j++) {
                result.push(doms[j])
            }
        }
    },
    // 实现全部的选择器功能；后面id有点儿多余
    // $all('#id') $all('.classname') $all('#id .calss tag')  
    $all: function(selector, id) {
        if (id) {
            id = $$.isString(id) ? $$.$id(id) : id;
            return id.querySelectorAll(selector);
        } else {
            return document.querySelectorAll(selector);
        }
    }
});
// 字符串操作
$$.extend($$, {
    //去除左边空格
    ltrim: function(str) {
        return str.replace(/(^\s*)/g, '');
    },
    //去除右边空格
    rtrim: function(str) {
        return str.replace(/(\s*$)/g, '');
    },
    //去除空格
    trim: function(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    formateString: function(str, data) {
        return str.replace(/@\((\w+)\)/g, function(match, key) {
            return typeof data[key] === "undefined" ? '' : data[key]
        });
    }
});
// 日期操作
$$.extend($$, {

});
// 数组操作
$$.extend($$, {

});
// 数字相关操作模块
$$.extend($$, {
    random: function(begin, end) {
        return Math.floor(Math.random() * (end - begin)) + begin;
    }
});
// 判断数据类型
$$.extend($$, {
    isNumber: function(val) {
        return typeof val === 'number' && isFinite(val)
    },
    isBoolean: function(val) {
        return typeof val === "boolean";
    },
    isString: function(val) {
        return typeof val === "string";
    },
    isUndefined: function(val) {
        return typeof val === "undefined";
    },
    isObj: function(str) {
        if (str === null || typeof str === 'undefined') {
            return false;
        }
        return typeof str === 'object';
    },
    isNull: function(val) {
        return val === null;
    },
    isArray: function(arr) {
        if (arr === null || typeof arr === 'undefined') {
            return false;
        }
        return arr.constructor === Array;
    }
});
// 事件模块
$$.extend($$, {
    // 绑定事件
    on: function(id, type, fn) {
        let dom = $$.isString(id) ? document.getElementById(id) : id;
        dom.addEventListener(type, fn, false);
    },
    // 解绑事件
    un: function(id, type, fn) {
        let dom = $$.isString(id) ? $$.$id(id) : id;
        dom.removeEventListener(type, fn, false);
    },
    // 鼠标点击
    click: function(id, fn) {
        $$.on(id, 'click', fn);
    },
    // 鼠标移入
    mouseover: function(id, fn) {
        $$.on(id, 'mouseover', fn);
    },
    // 鼠标离开
    mouseout: function(id, fn) {
        $$.on(id, 'mouseout', fn);
    },
    // 鼠标悬浮
    hover: function(id, fnover, fnout) {
        if (fnover) {
            $$.on(id, 'mouseover', fnover);
        }
        if (fnout) {
            $$.on(id, 'mouseout', fnout);
        }
    },
    // 获取事件event对象
    getEvent: function(e) {
        return e ? e : window.event;
    },
    // 获取事件event对象目标元素
    getTarget: function(e) {
        var event = getEvent(e);
        return event.target || event.srcElement;
    },
    // 阻止元素事件默认行为
    preventDefault: function(e) {
        var event = $$.getEvent(e);
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    // 阻止事件冒泡
    stopPropagation: function(e) {
        var event = $$.getEvent(e);
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    //事件委托 -- 直接拿过来的
    delegate: function(pid, eventType, selector, fn) {
        //参数处理
        var parent = $$.$id(pid);

        function handle(e) {
            var target = $$.GetTarget(e);
            if (target.nodeName.toLowerCase() === selector || target.id === selector || target.className.indexOf(selector) != -1) {
                // 在事件冒泡的时候，回以此遍历每个子孙后代，如果找到对应的元素，则执行如下函数
                // 为什么使用call，因为call可以改变this指向
                // 大家还记得，函数中的this默认指向window，而我们希望指向当前dom元素本身
                fn.call(target);
            }
        }

        //当我们给父亲元素绑定一个事件，他的执行顺序：先捕获到目标元素，然后事件再冒泡
        //这里是是给元素对象绑定一个事件
        parent[eventType] = handle;
    }
});
// css框架
$$.extend($$, {
    // setStyle('ul li', 'border', '1px solid yellow');
    // 设置样式
    setStyle: function(context, key, value) {
        let doms = $$.isString(context) ? $$.$all(context) : context;
        for (let i = 0, len = doms.length; i < len; i++) {
            doms[i].style[key] = value;
        }
    },
    // 原生获取样式，有问题。动态添加的样式，无法获取
    // 获取样式，默认只能一个一个的设置
    // 使用：getStyle($$.$all('ul li.current'), 'color')
    // getStyle('#ul li', 'backgroundColor')
    getStyle: function(context, key) {
        let doms = $$.isString(context) ? $$.$all(context) : context;
        // IE
        if (doms[0].currentStyle) {
            return doms[0].currentStyle[key];
        } else {
            return window.getComputedStyle(doms[0], null)[key];
        }
    },
    // 1. 传递两个参数：获取
    // 2. 传递三个参数：设置
    // 各个击破 context字符串和dom都可以
    css: function(context, key, value) {
        let doms = $$.isString(context) ? $$.$all(context) : context;
        // console.log(arguments.callee.length)
        // console.log(doms.length);
        if (doms.length) {
            // 对key进行检测
            let index = key.indexOf('-');
            if (index === -1) {
                key[index] = '';
                key[index + 1].toUpperCase();
            }
            // 设置
            if (value) {
                // value == backgroundColor / backgroud-color

                $$.setStyle(doms, key, value)
            }
            // 获取
            else {
                return $$.getStyle(doms, key)
            }
        }
    },
    // 显示
    show: function(context) {
        $$.css(context, 'display', 'block');
    },
    // 隐藏
    hide: function(context) {
        $$.css(context, 'display', 'none');
    },
    // 元素高度宽度概述
    // 计算方式：clientHeight clientWidth innerWidth innerHeight
    // 元素的实际高度+border，也不包含滚动条
    offsetWidth: function(id) {
        id = $$.isString(id) ? $$.$id(id) : id;
        return id.offsetWidth;
    },

    offsetHeight: function(id) {
        id = $$.isString(id) ? $$.$id(id) : id;
        return id.offsetHeight;
    },

    // 元素的实际高度 + border， 也不包含滚动条
    clientWidth: function(id) {
        id = $$.isString(id) ? $$.$id(id) : id;
        return id.clientWidth;
    },

    clientHeight: function(id) {
        id = $$.isString(id) ? $$.$id(id) : id;
        return id.clientHeight;
    },

    //    元素的滚动高度和宽度
    //    当元素出现滚动条时候，这里的高度有两种：可视区域的高度 实际高度（可视高度+不可见的高度）
    //    计算方式 scrollwidth
    scrollHeight: function(id) {
        id = $$.isString(id) ? $$.$id(id) : id;
        return id.scrollHeight;
    },

    scrollWidth: function(id) {
        id = $$.isString(id) ? $$.$id(id) : id;
        return id.scrollWidth;
    },
    // 滚动高度，相对于元素左上角
    scrollTop: function(id) {
        id = $$.isString(id) ? $$.$id(id) : id;
        return id.scrollTop;
    },

    scrollLeft: function(id) {
        id = $$.isString(id) ? $$.$id(id) : id;
        return id.scrollLeft;
    },
    //获取屏幕的高度和宽度
    screenHeight: function() {
        return window.screen.height
    },
    screenWidth: function() {
        return window.screen.width
    },
    //文档视口的高度和宽度
    dWidth: function() {
        return document.documentElement.clientWidth
    },
    dHeight: function() {
        return document.documentElement.clientHeight
    },
    //文档滚动区域的整体的高和宽
    dScrollHeight: function() {
        return document.body.scrollHeight;
    },
    dScrollWidth: function() {
        return document.body.scrollWidth;
    },
    //获取滚动条相对于其顶部的偏移
    dScrollTop: function() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        return scrollTop;
    },
    //获取滚动条相对于其左边的偏移
    dScrollLeft: function() {
        var scrollLeft = window.pageXOffset || document.body.scrollLeft || (document.documentElement && document.documentElement.scrollLeft);
        return scrollLeft;
    },
    // 相对于定位的父盒子
    // 元素的相对位置：每个元素都有offsetTop和offsetLeft属性，
    // 表示该元素的左上角与父容器（offsetParent对象）左上角的距离
    offset: function(id) {
        function offsetLeft(id) {
            return id.offsetLeft;
        }

        function offsetTop(id) {
            return id.offsetTop;
        }

        id = $$.isString(id) ? $$.$id(id) : id;
        return {
            left: offsetLeft(id),
            top: offsetTop(id)
        }
    },
    //  元素的绝对位置：指该元素的左上角相对于整张网页左上角的坐标。这个绝对位置要通过计算才能得到。
    //  首先，每个元素都有offsetTop和offsetLeft属性，表示该元素的左上角与父容器（offsetParent对象）左上角的距离。
    //  所以，只需要将这两个值进行累加，就可以得到该元素的绝对坐标。

    //实现原理
    //在阅读javascript高级程序设计第三版DOM部分时，
    //了解到要获取某个元素在页面上的偏移量，
    //需要将这个元素的offsetLeft和offsetTop与其offsetParent的相同属性相加，一直循环直至根元素。
    //所以，要得到元素到文档区域的坐标位置，
    //只需通过while循环不断获取offsetParent的offsetLeft/offsetTop直到offsetParent = null为止。
    absoluteOffset: function(id) {
        function absoluteLeft(id) {
            let left = $$.offset(id).left;
            let parent = id.offsetParent;
            while (parent) {
                left += $$.offset(parent).left;
                parent = parent.offsetParent;
            }
            return left;
        }

        function absoluteTop(id) {
            let top = $$.offset(id).top;
            let parent = id.offsetParent;
            while (parent) {
                top += $$.offset(parent).top;
                parent = parent.offsetParent;
            }
            return top;
        }
        id = $$.isString(id) ? $$.$id(id) : id;
        return {
            left: absoluteLeft(id),
            top: absoluteTop(id)
        }
    }
})