---
title : Java @FunctionalInterface Function
date : 2018/10/23 18:55:00
tags :
- java
---

# Java @FunctionalInterface Function

[TOC]

## 源码
``` Java
  @FunctionalInterface
  public interface Function<T,R>{
    R apply(T t);

    default <V> Function<V,R> compose(Function<? extends V,? extends T> before){
      Objects.requireNonNull(before);
      return (V v)-> apply(before.apply);
    }


    default <V> Function<T,V> andThen(Function<? super R,? superOb V> after){
      Objects.requireNonNull(after);
      return (T t)-> after.apply(apply(t));
    }

    static <T> Function<T, T> identity(){ return t -> t;}
  }
```

## 介绍

Function<T,R>  ,这里我翻译一下[api](https://docs.oracle.com/javase/8/docs/api/java/util/function/Function.html)上的内容

### Type Parameters
T 函数的输入类型
R 函数的输出类型

### All Known Subinterface

UnaryOperator<T>

### Functional Interface

这是一个函数式接口,因此可以作为lambda表达式或者[方法引用](https://www.cnblogs.com/xiaoxi/p/7099667.html)的赋值对象

## 方法
- apply 实现执行处理
- compose 构建一个新的Function, 将before的输出作为新Function的apply的输入,新apply的实现同当前
- andThen 同理
