---
title: Javascript 模块化
date: 2020-04-10 20:00:11
tags:
- javascript
---
- nodejs 模块化规范
  - exports 和  module.exports
  - 引用顺序
  - 闭包解决
  - 面向对象开发
    - 闭包始终返回对象
  - YUI
  - commonJS
    - 原生module模块，每个文件都是一个module实例
    - 文件内部通过require对象引入指定模块
    - 所有文件加载同步完成
    - 通过module关键字暴露内容
    - 每个模块加载一次之后就会被缓存
    - 模块编译本质是沙箱编译
    - 使用了nodeapi ，只能在服务端运行
  - AMD 和 RequireJS
    - AMD Asynchronous Module Definition
      - 异步方式加载模块
        - 模块的加载不影响后续代码使用
        - 所有依赖该模块的语句定义在回调中，等依赖项加载完后回调函数运行
    - RequireJS 是AMD的实现
      - define(id?, dependencies?, factory)
      - 动态创建script标签
        - onload监听加载完毕
  - CMD 和 SeaJs
    - SeaJs是CMD的实现
  - ES6 中的模块化
    - 新增关键字
      - import
      - from
      - as
      - export
      - default
    - 输出值引用
    - 编译时输出接口



``` JavaScript
// YUI - 编写模块
YUI.add('dom', function(Y) {
  Y.DOM = { ... }
})

// YUI - 使用模块
YUI().use('dom', function(Y) {
  Y.DOM.doSomeThing();
  // use some methods DOM attach to Y
})

// hello.js
YUI.add('hello', function(Y){
    Y.sayHello = function(msg){
        Y.DOM.set(el, 'innerHTML', 'Hello!');
    }
},'3.0.0',{
    requires:['dom']
})

// main.js
YUI().use('hello', function(Y){
    Y.sayHello("hey yui loader");
})
```

``` JavaScript
// 沙箱编译
(function (exports, require, module, __filename, __dirname) {
    //原始文件内容
})();
```
- node定时器
  - process.nextTick()
- 不同环境下instanceof 原理
- web worker
  - 创建
    - new Worker('worker.js',{name : 'myw'})
    - new Worker(window.URL.createObjectURL(new Blob(['console.info("worker")'])))
  - 信息传递
    - postMessage
    - onMessage
    - addEventListener('event-tag', callback)
    - onError
      - addEventListener ('error' callback)
  - 关闭
    - worker.terminate
    - self.close
  - 以拷贝方式传递数据

- 浏览器存储
  - cookie
  - localStorage
  - userData
- 行内元素
  - span
  - input
- Navagator 对象包含浏览器信息
- css3新增属性
- 不标准盒模型？
  - 怪异模式
- 提高dom元素操作效率：
  - 使用addEventListener替代 onxxx(比如onclick) 进行事件绑定 不能
- 'a.b.c'.replace(/(.)\.(.)\.(.)/, '$2.$1.$0')  
  - $0 不是
-
```
var a = [];
a.push(1, 2);
a.shift(3, 4);
a.concat([5, 6]);
a.splice(0, 1, 2);
```

```
console.log(1);
    setTimeout(function() {
    console.log(2);
}, 0);
new Promise((resolve, reject) => {
    console.log(3);
    resolve();
})
.then(() => {
    console.log(4);
});
console.log(5);
```

```
console.log(1);
process.nextTick(() => {
    console.log(2);
process.nextTick(() => {
    console.log(3);
    });
});
setTimeout(() => {
    console.log(4);
}, 10);
setImmediate(() => {
    console.log(5);
});
while (Math.random() < 0.99999);
console.log(6);
```

-  Node.js 中的进程稳定性保障
  - process.on('uncaughtExpection', callback) 可以处理未捕获的 throw Error 异常
  - process.on('unhandledRejection', callback) 用于处理未捕获的 promise reject 异常
  - 尽可能手动的为一些可能出现异常的代码片段加上 try...catch，如 JSON.parse
-  EventEmitter
- 页面加载速度

``` javascript
// 页面上存在id为jsBlink的下划线闪动节点，请按照如下需求实现 output 函数
// 1、函数 output 接收一个字符串参数，每隔200毫秒在闪动节点之前逐个显示字符
// 2、请新建span节点放置每个字符，其中span必须存在class "word"，并随机加上 color0 ~ color23 中的任一个class（请使用系统随机函数）
// 3、每次输出指定字符串前，请将闪动节点之前的所有其他节点移除
// 4、不要销毁或者重新创建闪动节点
// 5、如果输出字符为空格、<、>，请分别对其进行HTML转义，如果是\n请直接输出<br />，其他字符不需要做处理
// 6、请不要手动调用output函数
// 7、当前界面为系统执行 output('hello world\n你好世界') 之后，最终的界面，过程请参考以下图片
// 8、请不要手动修改html和css
// 9、不要使用第三方插件
// 10、请使用ES5语法
```

[JavaScript模块化发展](https://segmentfault.com/a/1190000015302578)
[Web Worker](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)
[NodeJs 定时器详解](http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html)
