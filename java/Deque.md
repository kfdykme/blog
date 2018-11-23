---
title : Java Deque
date : 2018/10/25 21:29:00
tags :
- java
---

# Java Deque

Deque 双端队列,内部有双端队列的相关方法,同时也有Stack,Queue和Colleciton的相关操作方法.

Deque内部有两个迭代器,一个是递减迭代器.

``` java
public Deque<E> extends Queue<E>{
  void addFirst();
  void addLast();
  boolean offerFirst();
  boolean offerLast();
  E removeFirst();
  E removeLast();
  E pollFirst();
  E pollLast();
  E getLast();
  E peekFirst();
  E peekLast();

  boolean removeFirstOccurence(Object o);
  boolean removeLastOccurence(Object o);

  // Queue Methods
  boolean add(E e);
  boolean offer(E e);
  E remove();
  E poll();
  E element();
  E peek();

  // Stack Methods
  void push(E e);
  E pop();


  // Collection Methods
  boolean remove(Object o);
  boolean contains(Object o);
  public int size();

  Iterator<E> iterator();

  Iterator<E> descendingIterator();

}
```
