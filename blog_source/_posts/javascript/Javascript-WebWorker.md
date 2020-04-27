---
title: JavaScript WebWorker
date: 2020-04-10 22:30:25
tags:
- javascript
---

# JavaScript WebWorker

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

> 参考
Javascript高级编程
[Web Worker](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)
