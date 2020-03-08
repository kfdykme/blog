---
title :Java Queue
date : 2018/10/25
tags :
- Java
---

# Java Queue



## 源码

``` java
public interface Queue<E> extends Collection<E>{
  boolean add(E e);

  boolean offer(E e);

  E remove();

  E poll();

  E element();

  E peek();
}
```

## 分析
Queue 定义了一些队列操作所需要的方法

- 插入操作
  - add
  - offer
- 取出并去除操作
  - remove
  - poll
- 取出不删除操作
  - element
  - peek

每个操作的不同方法基本上就是是否会抛出异常的区别
