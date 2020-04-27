---
title: Javascript 定时器
date: 2020-04-10 22:33:12
tags:
- javascript
---

# Javascript 定时器

- node定时器
  - 同步任务
  - 异步任务
    - 浏览器
      - setTimeout
      - setInterval
    - node + 浏览器
      - setImmediate
      - process.nextTick()

同步任务 > 异步任务

- 异步任务
  - 本轮循环
    - process.nextTick和promise的回调追加在本轮循环，同步任务之后
  - 次轮循环
    - setTimeout
    - setInterval
    - setImmediate

- 在本轮循环中
  - 同步任务
  - process.nextTick
  - 微任务
    - promise的回调函数
- 次轮循环


## 例如：

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

>cankao
[NodeJs 定时器详解](http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html)
