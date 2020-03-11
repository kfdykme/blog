---
title: Spring2vue-my-code-life-2
date: 2020-03-09 23:45:43
tags:
- code
---


# 从Spring 到Vue 2 Spring IOC&AOP

- 控制反转 IoC (Inversion of controll)
- 切面编程 AOP Aspect Oriented Programming
  - Java 代理
    - 动态代理
    - 静态代理

## IOC

IOC，Inversion of Controll ,控制反转。我一直无法理解这东西到底是什么，为什么起这么一个反人类的名字。

[java简单例子介绍IOC和AOP](https://www.cnblogs.com/jonky/p/10154767.html)
### DI Dependency  Inject 依赖注入

[依赖注入和控制反转的理解，写的太好了。](https://blog.csdn.net/liunianqingshi/article/details/78144489)


### DL Dependency  Lookup 依赖查找

- 依赖拖拽
- 上下文查找

## AOP 切面编程

切面编程的简单意思大概就是，把代码切成3层。中间的夹心层是原先的逻辑代码，前后的饼干层是由AOP方式实现的通用逻辑代码。

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


动态代理的实现方式就是通过

Proxy.newProxyInstance方法，将需要代理的类,方法，以及参数传递到对应的 InvocationHandler内，然后在调用方法的前后增加想要的逻辑代码

``` Java
public class AbsServiceDynamicProxy {

  public static AbcService (AbcServiceImpl serviceImpl) {
    return new Proxy.newProxyInstance(serviceImpl.class.getClassLoader()
    ,logger.getClass().getInterfaces()
    , new InvocationHandler() {
      @Override
           public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
               System.out.println("before proxy");
               method.invoke(serviceImpl,args);
               System.out.println("after proxy")
               return null;
           }
    })
  }
}
```

###### 相关
- [Retrofit 动态代理](/2019/04/15/android/retrofit/RetrofitFrist/)
- Spring的动态代理，后续看源码的时候再做分析
