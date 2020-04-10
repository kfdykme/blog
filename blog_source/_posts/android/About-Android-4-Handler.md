---
title: About Android 4 Handler
date: 2020-03-30 01:08:36
tags:
- android
---

# About Android 4 Handler

- Handler
- Message
- MessageQueue
- Looper
- HandlerThread

## Handler

handler 的使用方式:

``` Java
//1 post postDelay
 Handler.post / postDelay (new Runnable() {
    @Override
    void run() {
      //todo
    }
  })

//2 sendMessage

创建handler
实现handlerMessage接口

handler.sendMessage(msg)
```

Activity finish时handler未执行完会引发Activity内存泄漏？

优化
- 通过静态内部类+弱引用方式实现handler
- 等等

## HandlerThread

HandlerThread继承Thread.

run方法内进行Looper的初始化相关操作

## Looper

- Looper.prepare
  - 从TheadLocal中取得Looper对象，执行多次会抛出异常

``` java

static final ThreadLocal<Looper> sThreadLocal = new ThreadLocal<Looper>();
//...
public static void prepare() {
  prepare(true);
}

private static void prepare(boolean quitAllowed) {
  if (sThreadLocal.get() != null) {
    throw new RuntimeException("Only on lopper may be created per thread");
  }
  sThreadLocal.set(new Looper(quitAllowed));
}
```

- Looper.loop()

``` Java
public static void loop() {
  final Looper me = myLooper();
  //..
  final MessageQueue queue = me.mQueue;
  //..
  for(;;) {
    Message msg = queue.next();
    //..
    msg.target.dispatchMessage(msg)
    //ms.target 是一个handler对象
    //Handler 在 enqueueMessage() 内为msg添加target
  }
  //..
  msg.recycleUnchecked()
}
```

- MessageQueu.next()
  - 内部也是一个无限循环
>参考
[Android Handler 使用详解](https://www.jianshu.com/p/0a274564a4b1)
[Android HandlerThread 完全解析](https://blog.csdn.net/lmj623565791/article/details/47079737)
