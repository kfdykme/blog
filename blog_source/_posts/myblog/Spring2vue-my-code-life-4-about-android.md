---
title: Spring2vue-my-code-life-4-about-android
date: 2020-03-14 01:25:50
tags:
---

# 从Spring 到Vue 4 关于Android


为什么会扯到Android呢，提起java，自然想起Android了呗。

java有java虚拟机，Android有dvm和art。

这三者有什么异同呢。

第一肯定是指令集不同。但是我也想不起具体哪个打哪个了。等下查查资料。

另外，jvm跑的是.class而dvm跑的是.dex。 art也是.dex.

从.class到.dex经历了什么呢，为什么要这样做呢？这中间的具体流程是怎样的呢？

以及，dvm和art有什么不同呢，为什么要这样做呢？ 怎样实现的呢？ 原理是什么呢？

说起Android虚拟机。我们都知道Android是一个基于Linux的操作系统，那么Android与Ubuntu有什么区别呢。

Android应用正在跑的进场，与Linux中的进程有什么区别，各自是怎样的呢？

一个Android应用从
- 下载
- 安装
- 手机桌面获取安装包信息
- 启动应用程序
- 应用程序挂起
- 待机
- 关闭

发生了什么

下载自然是http请求，io操作。但是具体怎么实现呢，还得查一下。

安装就涉及到art dvm的区别了

手机获取安装包信息，就涉及到各种manager的关系了。

启动应用程序，就涉及到Android启动模式的相关问题了。

Android声明周期

Android四大组件

四大组件的相关

四大组件与进程的关系

四大组件的通信方式呢

那进程的通信方式呢

与Linux有什么区别呢

与原生的通信方式呢。

Android数据库。事务，触发器

- greendao
- realm
- room

Android事件分发机制

分发机制首先都有屏幕，那Android window相关呢

另外就是recyclerview， 请问recyclerview

Android framework
- Activity Manager
- Window Manager
- Content Provider
- View System
- Notification Manager
- Package Manager
- Telephony Manager
- Resource Manager
- Location Manager
- XMMP Service

Android
- Linux Kernel
- Libraries & android runtime
- application framework
- application
