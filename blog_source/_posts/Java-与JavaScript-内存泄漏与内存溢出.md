---
title: Java 与JavaScript 内存泄漏与内存溢出
date: 2020-03-22 20:01:01
tags:
- Java
- Javascript
- 内存
---


# Java 与JavaScript 的内存泄漏和内存溢出


## 内存泄漏 memory leak
申请内存后无法释放已申请的内存空间

## 内存溢出 out of memory
申请内存时，没有足够的内存空间可以使用

## java中
- java内存回收机制
- java内存泄漏原因

- 引用
  - 强引用
  - 软引用
    - 内存不足时回收
  - 弱引用
    - 扫描时回收
  - 虚引用
    - 形同虚设

### java内存回收机制

java中的内存主要指jvm虚拟机中的内存。通常一个java对象是被new或者通过放射的方式创建的。如果创建的是基础类型对象，则先在常量池中寻找，如果常量池中没有相对应得变量，则创建，然后栈中创建引用指向常量池


### java内存泄漏原因
- 静态类集合类引起内存泄漏
- 结合内对象hash不同后remove不起作用
- 监听器没有remove
- 各种连接
- 单例模式
## JavaScript中
- 垃圾回收机制
- 内存泄漏的识别方法
- 命令行查看
- WeakMap

### 垃圾回收机制

 引用计数

### 内存泄漏识别
- 经验法则
  - 连续5次gc， 内存占用一次比一次大
- 浏览器
- 命令行 process.memoryUsage

### WeakMap
ES^ 新数据结构
- WeakSet
- WeakMap

``` JavaScript
const wm = new WeakMap();

const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element) // "some information"
```
##异同


参考
[1](http://www.ruanyifeng.com/blog/2017/04/memory-leak.html)
