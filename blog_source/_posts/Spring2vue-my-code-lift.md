---
title: Spring2vue-my code lift
date: 2020-03-08 16:57:57
tags:
- java
---


# 从Spring 到Vue （一） Spring

从去年六月份开始使用Spring+Vue开发前后端，那么原理是什么呢？我还不知道，这是我对自身知识结构的梳理。

## Spring 是什么东西

*Spring* 是一个后端框架，它用于开发后端。和他平级的还有 *ktor* ，*express*等。

当然*Spring*远不止此，但是从一个非java后端人士的角度来说，暂时就这样把。

## 使用Spring进行开发与使用原生Java的区别

我为什么需要使用*Spring*呢，假如我需要实现一个http服务。我为什么不使用原生的java api帮助我实现一个简单的http服务器呢？

### HTTP服务器

由此，让我先梳理一下http服务器做了什么事情。

- 响应网络请求，返回api接口内容
- 响应网络请求，返回html资源
- 与mysql等进行通信。
- 从服务器端进行请求，获取内网数据

### Java Api 实现HTTP服务器

使用 com.sun.net.httpserver 包进行相关操作。我本身没有尝试过进行这样的操作，因为以往实现简单HTTP服务时我更倾向于使用express等node相关的技术栈，因为他们更*快*。

总而言之，通过官方给予我们的com.sun.net.httpserver包，我们可以简单得实现一个REST API，但是关于：

- 认证
- xxxx我没想好得内容，使用Spring会更加方便。

### Spring 帮我们做了什么呢

现如今我想要使用spring搭建一个http服务器


- 控制反转 IoC (Inversion of controll)
- 切面编程 AOP Aspect Oriented Programming
  - Java 代理
    - 动态代理
    - 静态代理

#### Java 代理

##### 静态代理

``` Java

public interface AbcService {
  public void doing();
}

public class AbcServiceImpl implements AbcService {
  public void doing() {
    System.out.println('doing');
  }
}

public class AbcServiceProxy implments AbcService {
  private AbcService abcService;

  public AbcServiceProxy (AbcService service) {
    abcService = service;
  }

  @Override
  public void doing() {
    System.out.println("doing start")
    abcService.doing()
    System.out.println("doing end")
  }
}
```

##### 动态代理

[Retrofit 动态代理]("/android/retrotif/RetrofitFirst")
