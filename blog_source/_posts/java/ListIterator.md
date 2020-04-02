---
title : Java ListIterator
date : 2018/10/24 16:36:00
tags :
- Java
---

# Java ListIterator

ListIterator extends Iterator,比起Iterator主要只有forEach方法,而ListIterator增加了大量的List处理的方法

## 源码

``` java
public ListIterator<E>  extends Iterator<E>{
  boolean hasNext();

  E next();

  boolean hasPrevious();

  E previous();

  int nextIndex();

  int previousIndex();

  void remove();

  void set(E e);

  void add(E e);
}
```

显而易见,
