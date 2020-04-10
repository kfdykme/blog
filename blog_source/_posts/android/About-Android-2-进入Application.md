---
title: About Android 2 进入Application
date: 2020-03-30 00:00:20
tags:
- android
---

# About Android 2 进入Application

上一篇总结（抄）了Android从开机到启动桌面的过程，接下来从Launcher展开。

- 启动application过程
- 启动Activity
- activity启动模式

## 启动Application
在ActivityThread的main方法中创建了一个主线程Looper并开启循环。
在Looper.loop()之前，会创建一个ActivityThread对象并attach(false)

在attach内部,会获取mgr.attachApplication(mAppThread).
mgr是一个IBinder引用，其实也是ActivityManagerService的引用

在attachApplication内会调用attachApplicationLocked(thread, callingPid)
然后thread.bindApplication(...)
后续会在ActivityStackSupervisor.attachApplicaiontLocked(app)
=> realStartActiviityLocked()

bindApplication最终会sendMessage到一个handler

该handler内对bindapplication做出响应
- 创建Application
  - ContextImpl.createAppContext(activityThread, this)
  - app = ..newApplicaiton(cl,appClass,appContext)
    - app.attach(context)
  - setOutterContext(app)
- mInstrumenttation.callApplicationOnCreate(app)

## 启动Activity

startActivity通过Instrumentation来启动activity
- startActivity
- startActivityForResult
- instrumentation.executeStartActivity
  - ActivityManager.getService().startActivity

ActivityManagerService中
- getService()
- startActivity()
- startActivityAsUser()
- ActivityStartController.obtainStarter.xxxx.execute()


ActivityStarter中
- 拿到ActivityRecord
- 判断启动模式
- Application

## activity启动模式
- Android启动模式和场景
  - singleInstance 全局唯一
     - oncreate
     - onnewintent onrestart onstart
  - singleStack 已处于栈内 复用并弹出上层
  - singleTop 已处于栈内时复用
  - standard

```
一般会问一些简单的题，例如

栈[A,B,C]

用不同的模式启动A会发生什么变化
```

> 参考
[1](https://blog.csdn.net/QDU_Jimmy/article/details/84259254)
[2](https://blog.csdn.net/jiabailong/article/details/50972742)
