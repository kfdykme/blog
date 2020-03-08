---
title : java @FunctionalInterface UnaryOperator
date : 2018/10/23 18:51:00
tags :
- Java
- FunctionalInterface
---

# Java @FunctionalInterface UnaryOperator

## 源码
``` java
@FunctionalInterface
public interface UnaryOperator<T> extends Function<T,T> {

  static <T> UnaryOperator<T> identity(){return t -> t;}

}
```


## 介绍

其实就是一个输入输出类型相同的Function<T,E>.此时T 同 E.
