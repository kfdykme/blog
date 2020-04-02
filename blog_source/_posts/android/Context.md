---
title : Android Context相关
date: 2018/11/20 11:52:00
tags:
- Java
---

# Android Context 相关

Context 基本上就是Activity + Service + Application

>Class Overview
Interface to global information about an application environment. This is an abstract class whose implementation is provided by the Android system. It allows access to application-specific resources and classes, as well as up-calls for application-level operations such as launching activities, broadcasting and receiving intents, etc.

Context是用于访问应用资源，类同时也进行application层的操作：启动activity广播以及接收广播

api文档上关于

再看看Context相关的子类.因为Context的父类就直接是java.lang.Object了。

Context的子类有
- ContextWrapper
- MockContext
