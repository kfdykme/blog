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

>参考
[JavaScript模块化发展](https://segmentfault.com/a/1190000015302578)
